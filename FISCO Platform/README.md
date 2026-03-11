# 资源租赁系统 🌐

本项目实现了一个基于智能合约的资源租赁系统，支持 CPU、GPU 和内存等资源的管理、租借和归还功能。💻🔄

## 文件介绍 📁

- **`BAC002.sol`**: 核心合约文件，定义了资源的管理、租借、归还等功能。实现了资源的发行、查询、租借、归还等操作，并支持暂停和恢复合约的功能。⚙️
- **`IBAC002.sol`**: 接口文件，定义了与 `BAC002.sol` 合约的交互接口，包括资源查询、租借记录查询等操作。🔗
- **`Register.sol`**: 包含用户和合约地址的注册和验证工具函数，支持资产的注册和管理操作。📝
- **`Counters.sol`**: 计数器工具库，用于管理增量计数器，跟踪租借记录和资源操作。📊
- **`Roles.sol`**: 角色管理工具，定义和验证特定角色的权限，如发行者（Issuer）和暂停者（Suspender）。👤
- **`SafeMath.sol`**: 提供安全的数学运算方法，防止整数溢出、下溢等问题，确保数值运算的安全性。🔒
- **`BAC002Holder.sol`**: 实现了 `IBAC002Receiver` 接口，用于处理资产的转移和接收。🔄

## 函数概览 🧑‍💻

| **函数名称**           | **输入参数**                                                 | **参数含义**                                                 |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `issueResource`        | `address to, uint256 cpu, uint256 gpu, uint256 memoryResource` | 发行资源给某个用户，参数为用户地址和分配的资源量，包括 CPU、GPU 和内存资源量。🔋 |
| `getResourceBalance`   | `address owner`                                              | 查询指定地址拥有的资源余额，包括 CPU、GPU 和内存资源。🔍      |
| `leaseResource`        | `address fro, address to, uint256 cpu, uint256 gpu, uint256 memoryResource, uint256 duration` | 租借资源，参数为出租者地址、承租者地址、租借的 CPU、GPU 和内存资源量，以及租借的时长。⏳ |
| `returnLeasedResource` | `address leaner, uint256 leaseIndex`                         | 归还租借的资源，参数为租借者地址和租借记录索引。🔄            |
| `getLeasedIn`          | `address user`                                               | 查询租借者地址的所有租借入资源记录，返回租借入的资源详细信息，包括出租者地址、资源数量、租借开始时间、持续时长等。📥 |
| `getLeasedOut`         | `address owner`                                              | 查询资源所有者的所有租借出资源记录，返回租借出的资源详细信息，包括承租者地址、资源数量、租借开始时间、持续时长等。📤 |
| `_removeLeaseFromList` | `Lease[] storage list, uint256 index`                        | 删除指定索引的租借记录。🗑️                                    |
| `isIssuer`             | `address account`                                            | 判断指定地址是否为发行者角色的持有者。返回布尔值，表示该地址是否拥有发行者角色。🎫 |

## TODO 📝

1. 目前的问题是在 **Webase** 上部署时无法使用 `msg.sender`，导致管理员和暂停者无法获得特权。需要修改权限控制机制。🔧
2. 租赁合约中，`leaseResource` 需要明确传递双方地址，需要改进为更简洁的操作。🛠️
3. 归还合约的 `index` 参数不够人性化，需要改进为更易于使用和理解的参数结构。🔄、
