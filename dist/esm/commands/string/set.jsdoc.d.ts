export type SetOptionsJsdoc = {
    /**
     * Only set the key if it does not already exist.
     * - Incompatible with option `XX`.
     * - Incompatible with option `GET` before 7.0.0.
     * - Available since: 2.6.12.
     * @type {true}
     */
    NX?: unknown;
    /**
     * Only set the key if it already exist.
     * - Incompatible with option `NX`.
     * - Available since: 2.6.12.
     * @type {true}
     */
    XX?: unknown;
    /**
     * Set the specified expire time, in *seconds*.
     * - Incompatible with options `PX`, `EXAT`, `PXAT` and `KEEPTTL`.
     * - Available since: 2.6.12.
     * @type {number}
     */
    EX?: unknown;
    /**
     * Set the specified expire time, in *milliseconds*.
     * - Incompatible with options `EX`, `EXAT`, `PXAT` and `KEEPTTL`.
     * - Available since: 2.6.12.
     * @type {number}
     */
    PX?: unknown;
    /**
     * Set the specified expire time, in *seconds*.
     * - Incompatible with options `EX`, `PX`, `PXAT` and `KEEPTTL`.
     * - Available since: 6.2.0.
     * @type {number}
     */
    EXAT?: unknown;
    /**
     * Set the specified expire time, in *milliseconds*.
     * - Incompatible with options `EX`, `PX`, `EXAT` and `KEEPTTL`.
     * - Available since: 6.2.0.
     * @type {number}
     */
    PXAT?: unknown;
    /**
     * Retain the time to live associated with the key.
     * - Incompatible with options `EX`, `PX`, `EXAT` and `PXAT`.
     * - Available since: 6.0.0.
     * @type {true}
     */
    KEEPTTL?: unknown;
    /**
     * Get the value of the key before the SET operation.
     * - Incompatible with option `NX` before 7.0.0.
     * - Available since: 6.2.0.
     * @type {true}
     */
    GET?: unknown;
};
