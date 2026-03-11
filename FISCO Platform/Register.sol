pragma solidity ^0.4.25;

contract Register {
    /*
     * ERC-165 标准中定义的接口识别函数的签名:
     * bytes4(keccak256('supportsInterface(bytes4)')) == 0x01ffc9a7
     * 用于让合约声明它是否支持某个接口
     */
    bytes4 private constant _INTERFACE_ID_BAC = 0x01ffc9a7;

    /**
     * @dev 存储每个接口ID（bytes4）的支持状态，true表示合约支持该接口
     */
    mapping(bytes4 => bool) private _supportedInterfaces;

    /**
     * @dev 构造函数，在部署时注册支持的接口
     * 此处注册的是 supportsInterface(bytes4) 这个方法本身
     */
    constructor () internal {
        _registerInterface(_INTERFACE_ID_BAC);
    }

    /**
     * @dev 对外接口：判断当前合约是否支持某个接口ID
     * @param interfaceId 接口的唯一标识符（函数选择器）
     * @return bool 返回是否支持该接口
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool) {
        return _supportedInterfaces[interfaceId];
    }

    /**
     * @dev 内部函数：注册合约支持的接口ID
     * @param interfaceId 要注册的接口ID
     * 要求接口ID不能是 0xffffffff，因为该ID被保留为非法ID（ERC165标准约定）
     */
    function _registerInterface(bytes4 interfaceId) internal {
        require(interfaceId != 0xffffffff, "BAC: invalid interface id");
        _supportedInterfaces[interfaceId] = true;
    }
}