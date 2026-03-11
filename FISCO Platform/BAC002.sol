pragma solidity ^0.4.25;

// 引入注册接口、计数器工具库、角色权限控制库
import "./Register.sol";
import "./Counters.sol";
import "./Roles.sol";
import "./SafeMath.sol";
import "./IBAC002.sol";

// 定义BAC002接收器接口，用于合约之间的资产接收逻辑
contract IBAC002Receiver {
    function onBAC002Received(address operator, address from, uint256 assetId, bytes memory data)
    public returns (bytes4);
}

// BAC002资产接收器默认实现，返回固定选择器
contract BAC002Holder is IBAC002Receiver {
    function onBAC002Received(address, address, uint256, bytes memory) public returns (bytes4) {
        return this.onBAC002Received.selector;
    }
}

// 定义资产发行者角色，带有添加、移除、检查权限的方法
contract IssuerRole {
    using Roles for Roles.Role;

    event IssuerAdded(address indexed account);
    event IssuerRemoved(address indexed account);

    Roles.Role private _issuers;
    
    //部署合约自动将部署者定义为发行者
    constructor () internal {
        _addIssuer(msg.sender);
    }

    modifier onlyIssuer() {
        require(isIssuer(msg.sender), "IssuerRole: caller does not have the Issuer role");
        _;
    }

    function isIssuer(address account) public view returns (bool) {
        return _issuers.has(account);
    }

    function addIssuer(address account) public onlyIssuer {
        _addIssuer(account);
    }

    function renounceIssuer() public {
        _removeIssuer(msg.sender);
    }

    function _addIssuer(address account) internal {
        _issuers.add(account);
        emit IssuerAdded(account);
    }

    function _removeIssuer(address account) internal {
        _issuers.remove(account);
        emit IssuerRemoved(account);
    }
}

// 定义暂停者角色，允许控制合约暂停与恢复
contract SuspenderRole {
    using Roles for Roles.Role;

    event SuspenderAdded(address indexed account);
    event SuspenderRemoved(address indexed account);

    Roles.Role private _suspenders;
    
    //部署合约自动将部署者定义为暂停者
    constructor () internal {
        _addSuspender(msg.sender);
    }

    modifier onlySuspender() {
        require(isSuspender(msg.sender), "SuspenderRole: caller does not have the Suspender role");
        _;
    }

    function isSuspender(address account) public view returns (bool) {
        return _suspenders.has(account);
    }

    function addSuspender(address account) public onlySuspender {
        _addSuspender(account);
    }

    function renounceSuspender() public {
        _removeSuspender(msg.sender);
    }

    function _addSuspender(address account) internal {
        _suspenders.add(account);
        emit SuspenderAdded(account);
    }

    function _removeSuspender(address account) internal {
        _suspenders.remove(account);
        emit SuspenderRemoved(account);
    }
}

// 支持暂停功能的合约，便于在异常或管理需要时中断合约运行
contract Suspendable is SuspenderRole {

    event Suspended(address account);
    event UnSuspended(address account);

    bool private _suspended;

    constructor () internal {
        _suspended = false;
    }

    modifier whenNotSuspended() {
        require(!_suspended, "Suspendable: suspended");
        _;
    }

    modifier whenSuspended() {
        require(_suspended, "Suspendable: not suspended");
        _;
    }

    function suspended() public view returns (bool) {
        return _suspended;
    }

    function suspend() public onlySuspender whenNotSuspended {
        _suspended = true;
        emit Suspended(msg.sender);
    }

    function unSuspend() public onlySuspender whenSuspended {
        _suspended = false;
        emit UnSuspended(msg.sender);
    }
}

// 主合约BAC002：实现资产注册、发行、转移、销毁、授权等功能
contract BAC002 is IssuerRole, Suspendable {
    using SafeMath for uint256;
    using Address for address;
    using Counters for Counters.Counter;

    bytes4 private constant _BAC002_RECEIVED = 0x31f6f50e;
    
    struct Resource {
        uint256 cpu;
        uint256 gpu;
        uint256 memoryResource;
    }

    struct Lease {
        address from;
        address to;
        uint256 cpu;
        uint256 gpu;
        uint256 memoryResource;
        uint256 startTime;
        uint256 duration;
    }

    // 用户拥有资源总量
    mapping(address => Resource) private _resourceBalance;

    // 用户出租给他人的资源租借记录
    mapping(address => Lease[]) private _leasedOut;

    // 用户从他人租入的资源记录
    mapping(address => Lease[]) private _leasedIn;

    // 事件记录
    event ResourceIssued(address indexed to, uint256 cpu, uint256 gpu, uint256 memoryResource);
    event ResourceLeased(address indexed from, address indexed to, uint256 cpu, uint256 gpu, uint256 memoryResource, uint256 duration);
    event ResourceReturned(address indexed user, address indexed owner, uint256 cpu, uint256 gpu, uint256 memoryResource);

    string private _description;
    string private _shortName;

    // 构造函数，初始化合约说明
    constructor(string description, string shortName) public {
        _description = description;
        _shortName = shortName;
    }
    
    function description() external view returns (string) {
        return _description;
    }

    function shortName() external view returns (string) {
        return _shortName;
    }
    
    
    // 发行资源给某用户
    function issueResource(address to, uint256 cpu, uint256 gpu, uint256 memoryResource) public {
        require(to != address(0));
        _resourceBalance[to].cpu = _resourceBalance[to].cpu.add(cpu);
        _resourceBalance[to].gpu = _resourceBalance[to].gpu.add(gpu);
        _resourceBalance[to].memoryResource = _resourceBalance[to].memoryResource.add(memoryResource);
        emit ResourceIssued(to, cpu, gpu, memoryResource);
    }

    // 查询资源余额
    function getResourceBalance(address owner) public view returns (uint256 cpu, uint256 gpu, uint256 memoryResource) {
        Resource storage r = _resourceBalance[owner];
        return (r.cpu, r.gpu, r.memoryResource);
    }

    // 租借资源
    function leaseResource(address fro, address to, uint256 cpu, uint256 gpu, uint256 memoryResource, uint256 duration) public {
        require(to != address(0) && to != fro);
        Resource storage ownerRes = _resourceBalance[fro];
        require(ownerRes.cpu >= cpu && ownerRes.gpu >= gpu && ownerRes.memoryResource >= memoryResource);
        
        Resource storage leanerRes = _resourceBalance[to];
        // 扣减资源
        ownerRes.cpu = ownerRes.cpu.sub(cpu);
        ownerRes.gpu = ownerRes.gpu.sub(gpu);
        ownerRes.memoryResource = ownerRes.memoryResource.sub(memoryResource);
        
        // 增加资源
        leanerRes.cpu = leanerRes.cpu.add(cpu);
        leanerRes.gpu = leanerRes.gpu.add(gpu);
        leanerRes.memoryResource = leanerRes.memoryResource.add(memoryResource);

        // 生成租借记录
        Lease memory lease = Lease({
            from: fro,
            to: to,
            cpu: cpu,
            gpu: gpu,
            memoryResource: memoryResource,
            startTime: block.timestamp,
            duration: duration
        });

        _leasedOut[fro].push(lease);
        _leasedIn[to].push(lease);

        emit ResourceLeased(fro, to, cpu, gpu, memoryResource, duration);
    }
    
    // 归还资源
    function returnLeasedResource(address leaner, uint256 leaseIndex) public {
        require(leaseIndex < _leasedIn[leaner].length, "Invalid lease index");
    
        Lease memory lease = _leasedIn[leaner][leaseIndex];
        // require(block.timestamp <= lease.expiration, "Lease already expired");
    
        // 归还资源给原拥有者
        _resourceBalance[lease.from].cpu = _resourceBalance[lease.from].cpu.add(lease.cpu);
        _resourceBalance[lease.from].gpu = _resourceBalance[lease.from].gpu.add(lease.gpu);
        _resourceBalance[lease.from].memoryResource = _resourceBalance[lease.from].memoryResource.add(lease.memoryResource);
    
        // 从使用者扣除资源
        _resourceBalance[leaner].cpu = _resourceBalance[leaner].cpu.sub(lease.cpu);
        _resourceBalance[leaner].gpu = _resourceBalance[leaner].gpu.sub(lease.gpu);
        _resourceBalance[leaner].memoryResource = _resourceBalance[leaner].memoryResource.sub(lease.memoryResource);
    
        // 删除该条 lease
        _removeLeaseFromList(_leasedIn[leaner], leaseIndex);
        
        // 查找并删除原拥有者的租借记录
        Lease[] storage outLeases = _leasedOut[lease.from];
        
        for (uint256 i = 0; i < outLeases.length; i++) {
            if (
                outLeases[i].from == lease.from &&
                outLeases[i].to == lease.to &&
                outLeases[i].cpu == lease.cpu &&
                outLeases[i].gpu == lease.gpu &&
                outLeases[i].memoryResource == lease.memoryResource &&
                outLeases[i].startTime == lease.startTime &&
                outLeases[i].duration == lease.duration
            ) {
                _removeLeaseFromList(_leasedOut[lease.from], i);
                break;
            }
        }
    
        emit ResourceReturned(leaner, lease.from, lease.cpu, lease.gpu, lease.memoryResource);
    }

    // 查询租借入的资源记录
    function getLeasedIn(address user) external view returns (
        address[] froms,
        uint256[] cpus,
        uint256[] gpus,
        uint256[] memoryResources,
        uint256[] startTimes,
        uint256[] durations
    ) {
        Lease[] storage leases = _leasedIn[user];
        uint256 len = leases.length;

        froms = new address[](len);
        cpus = new uint256[](len);
        gpus = new uint256[](len);
        memoryResources = new uint256[](len);
        startTimes = new uint256[](len);
        durations = new uint256[](len);

        for (uint256 i = 0; i < len; i++) {
            Lease storage l = leases[i];
            froms[i] = l.from;
            cpus[i] = l.cpu;
            gpus[i] = l.gpu;
            memoryResources[i] = l.memoryResource;
            startTimes[i] = l.startTime;
            durations[i] = l.duration;
        }
    }
    
    // 查询租借出的资源记录
    function getLeasedOut(address owner) external view returns (
        address[] tos,
        uint256[] cpus,
        uint256[] gpus,
        uint256[] memoryResources,
        uint256[] startTimes,
        uint256[] durations
    ) {
        Lease[] storage leases = _leasedOut[owner];
        uint256 len = leases.length;

        tos = new address[](len);
        cpus = new uint256[](len);
        gpus = new uint256[](len);
        memoryResources = new uint256[](len);
        startTimes = new uint256[](len);
        durations = new uint256[](len);

        for (uint256 i = 0; i < len; i++) {
            Lease storage l = leases[i];
            tos[i] = l.to;
            cpus[i] = l.cpu;
            gpus[i] = l.gpu;
            memoryResources[i] = l.memoryResource;
            startTimes[i] = l.startTime;
            durations[i] = l.duration;
        }
    }
    
    function _removeLeaseFromList(Lease[] storage list, uint256 index) internal {
        uint256 lastIndex = list.length - 1;
        if (index != lastIndex) {
            list[index] = list[lastIndex];
        }
        list.length--;
    }
}
    