pragma solidity ^0.4.24;

// 安全数学运算库，用于防止整数溢出、除零等问题
library SafeMath {

    // 乘法函数：返回 a * b，如果发生溢出则抛出异常
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas 优化：如果 a 为 0，直接返回 0，避免额外计算
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;

        // 检查是否发生溢出，如果 c / a ≠ b，则说明乘法溢出
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    // 除法函数：返回 a / b，如果 b 为 0 则抛出异常
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity 在除数为 0 时会自动报错，但仍推荐添加检查
        require(b > 0, "SafeMath: division by zero");

        uint256 c = a / b;

        return c;
    }

    // 减法函数：返回 a - b，如果 b > a（即结果为负）则抛出异常
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");

        uint256 c = a - b;

        return c;
    }

    // 加法函数：返回 a + b，如果发生溢出则抛出异常
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;

        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    // 取模函数：返回 a % b，如果 b 为 0 则抛出异常
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}