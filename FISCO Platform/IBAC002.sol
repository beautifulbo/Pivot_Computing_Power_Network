pragma solidity ^0.4.25;

interface IBAC002 {
    // --- 查询资源余额 ---
    function getResourceBalance(address owner) external view returns (uint256 cpu, uint256 gpu, uint256 memoryResource);

    // --- 查询租借记录（展开形式） ---
    function getLeasedOutExpanded(address owner) external view returns (
        address[] tos,
        uint256[] cpus,
        uint256[] gpus,
        uint256[] memoryResources,
        uint256[] startTimes,
        uint256[] durations
    );

    function getLeasedInExpanded(address user) external view returns (
        address[] froms,
        uint256[] cpus,
        uint256[] gpus,
        uint256[] memoryResources,
        uint256[] startTimes,
        uint256[] durations
    );

    // --- 操作方法 ---
    function issueResource(address to, uint256 cpu, uint256 gpu, uint256 memoryResource) external;
    function leaseResource(address to, uint256 cpu, uint256 gpu, uint256 memoryResource, uint256 duration) external;
    function returnLeasedResource(uint256 leaseIndex) external;

    // --- 元信息 ---
    function description() external view returns (string);
    function shortName() external view returns (string);

    // --- 事件 ---
    event ResourceIssued(address indexed to, uint256 cpu, uint256 gpu, uint256 memoryResource);
    event ResourceLeased(address indexed from, address indexed to, uint256 cpu, uint256 gpu, uint256 memoryResource, uint256 duration);
    event ResourceReturned(address indexed user, address indexed owner, uint256 cpu, uint256 gpu, uint256 memoryResource);
}