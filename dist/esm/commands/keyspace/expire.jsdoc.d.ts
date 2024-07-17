export type ExpireOptionsJsdoc = {
    /**
     * Set expiry only when the key has no expiry.
     * - Incompatible with options `XX`, `GT` and `LT`.
     * - Available since: 7.0.0.
     * @type {true}
     */
    NX?: true;
    /**
     * Set expiry only when the key has an existing expiry.
     * - Incompatible with options `NX`, `GT` and `LT`.
     * - Available since: 7.0.0.
     * @type {true}
     */
    XX?: true;
    /**
     * Set expiry only when the new expiry is greater than current one.
     * - Incompatible with options `NX`, `XX` and `LT`.
     * - Available since: 7.0.0.
     * @type {true}
     */
    GT?: true;
    /**
     * Set expiry only when the new expiry is less than current one.
     * - Incompatible with options `NX`, `XX` and `GT`.
     * - Available since: 7.0.0.
     * @type {true}
     */
    LT?: true;
};
