pragma solidity ^0.4.25;

import "./SafeMath.sol"; // 引入安全数学运算库（用于防止溢出）

/**
 * @title Counters
 * @dev 提供可安全递增/递减的计数器工具库
 * 常用于生成唯一 ID，例如资产 ID、交易流水号等
 */
library Counters {
    using SafeMath for uint256; // 引入 SafeMath 方法以增强安全性

    struct Counter {
        // 私有计数器值，默认初始化为0
        // 注意：当前Solidity不支持强制访问控制，因此依赖约定
        uint256 _value;
    }

    // 获取当前计数器的值
    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    // 计数器值+1
    function increment(Counter storage counter) internal {
        counter._value += 1;
    }

    // 计数器值-1（注意防止下溢）
    function decrement(Counter storage counter) internal {
        counter._value = counter._value.sub(1);
    }
}

/**
 * @title Address
 * @dev 判断某地址是否为合约地址的工具库
 */
library Address {
    /**
     * @dev 判断目标地址是否为合约地址
     * 注意：如果该函数在合约构造函数中调用，将返回 false（因为此时代码尚未写入链上）
     * @param account 被检测的地址
     * @return 返回布尔值，true 表示是合约地址，false 表示普通地址或尚未部署的合约
     */
    function isContract(address account) internal view returns (bool) {
        uint256 size;

        // 使用内联汇编获取地址的代码大小，代码大小大于0说明是合约
        // extcodesize(account) 返回合约的代码长度
        assembly { size := extcodesize(account) }

        return size > 0;
    }
}