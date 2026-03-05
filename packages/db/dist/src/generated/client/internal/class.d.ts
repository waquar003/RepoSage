import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.project`: Exposes CRUD operations for the **Project** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Projects
      * const projects = await prisma.project.findMany()
      * ```
      */
    get project(): Prisma.ProjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.userToProject`: Exposes CRUD operations for the **UserToProject** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UserToProjects
      * const userToProjects = await prisma.userToProject.findMany()
      * ```
      */
    get userToProject(): Prisma.UserToProjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.commit`: Exposes CRUD operations for the **Commit** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Commits
      * const commits = await prisma.commit.findMany()
      * ```
      */
    get commit(): Prisma.CommitDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.sourceCodeEmbedding`: Exposes CRUD operations for the **SourceCodeEmbedding** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SourceCodeEmbeddings
      * const sourceCodeEmbeddings = await prisma.sourceCodeEmbedding.findMany()
      * ```
      */
    get sourceCodeEmbedding(): Prisma.SourceCodeEmbeddingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.question`: Exposes CRUD operations for the **Question** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Questions
      * const questions = await prisma.question.findMany()
      * ```
      */
    get question(): Prisma.QuestionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.meeting`: Exposes CRUD operations for the **Meeting** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Meetings
      * const meetings = await prisma.meeting.findMany()
      * ```
      */
    get meeting(): Prisma.MeetingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.utterance`: Exposes CRUD operations for the **Utterance** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Utterances
      * const utterances = await prisma.utterance.findMany()
      * ```
      */
    get utterance(): Prisma.UtteranceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.issue`: Exposes CRUD operations for the **Issue** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Issues
      * const issues = await prisma.issue.findMany()
      * ```
      */
    get issue(): Prisma.IssueDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Transactions
      * const transactions = await prisma.transaction.findMany()
      * ```
      */
    get transaction(): Prisma.TransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
