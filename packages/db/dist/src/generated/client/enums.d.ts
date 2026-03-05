export declare const MeetingStatus: {
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type MeetingStatus = (typeof MeetingStatus)[keyof typeof MeetingStatus];
