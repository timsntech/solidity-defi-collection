// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IOwnable.sol";

interface IPausable is IOwnable {
    function paused() external returns (bool);
    function unpause() external;
    function pause() external;
}
