import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Project: "Project";
    readonly UserToProject: "UserToProject";
    readonly Commit: "Commit";
    readonly SourceCodeEmbedding: "SourceCodeEmbedding";
    readonly Question: "Question";
    readonly Meeting: "Meeting";
    readonly Utterance: "Utterance";
    readonly Issue: "Issue";
    readonly Transaction: "Transaction";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly imageUrl: "imageUrl";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly emailAddress: "emailAddress";
    readonly credits: "credits";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const ProjectScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly name: "name";
    readonly githubUrl: "githubUrl";
    readonly deletedAt: "deletedAt";
};
export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum];
export declare const UserToProjectScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
    readonly projectId: "projectId";
};
export type UserToProjectScalarFieldEnum = (typeof UserToProjectScalarFieldEnum)[keyof typeof UserToProjectScalarFieldEnum];
export declare const CommitScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly projectId: "projectId";
    readonly commitMessage: "commitMessage";
    readonly commitHash: "commitHash";
    readonly commitAuthorName: "commitAuthorName";
    readonly commitAuthorAvatar: "commitAuthorAvatar";
    readonly commitDate: "commitDate";
    readonly summary: "summary";
};
export type CommitScalarFieldEnum = (typeof CommitScalarFieldEnum)[keyof typeof CommitScalarFieldEnum];
export declare const SourceCodeEmbeddingScalarFieldEnum: {
    readonly id: "id";
    readonly sourceCode: "sourceCode";
    readonly fileName: "fileName";
    readonly summary: "summary";
    readonly projectId: "projectId";
};
export type SourceCodeEmbeddingScalarFieldEnum = (typeof SourceCodeEmbeddingScalarFieldEnum)[keyof typeof SourceCodeEmbeddingScalarFieldEnum];
export declare const QuestionScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly question: "question";
    readonly answer: "answer";
    readonly filesReferences: "filesReferences";
    readonly projectId: "projectId";
    readonly userId: "userId";
};
export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum];
export declare const MeetingScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly meetingUrl: "meetingUrl";
    readonly name: "name";
    readonly projectId: "projectId";
    readonly status: "status";
    readonly globalSummary: "globalSummary";
    readonly entities: "entities";
};
export type MeetingScalarFieldEnum = (typeof MeetingScalarFieldEnum)[keyof typeof MeetingScalarFieldEnum];
export declare const UtteranceScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly meetingId: "meetingId";
    readonly speaker: "speaker";
    readonly text: "text";
    readonly start: "start";
    readonly end: "end";
};
export type UtteranceScalarFieldEnum = (typeof UtteranceScalarFieldEnum)[keyof typeof UtteranceScalarFieldEnum];
export declare const IssueScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly start: "start";
    readonly end: "end";
    readonly gist: "gist";
    readonly headline: "headline";
    readonly summary: "summary";
    readonly meetingId: "meetingId";
};
export type IssueScalarFieldEnum = (typeof IssueScalarFieldEnum)[keyof typeof IssueScalarFieldEnum];
export declare const TransactionScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly userId: "userId";
    readonly credits: "credits";
};
export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
