import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Utterance
 *
 */
export type UtteranceModel = runtime.Types.Result.DefaultSelection<Prisma.$UtterancePayload>;
export type AggregateUtterance = {
    _count: UtteranceCountAggregateOutputType | null;
    _avg: UtteranceAvgAggregateOutputType | null;
    _sum: UtteranceSumAggregateOutputType | null;
    _min: UtteranceMinAggregateOutputType | null;
    _max: UtteranceMaxAggregateOutputType | null;
};
export type UtteranceAvgAggregateOutputType = {
    start: number | null;
    end: number | null;
};
export type UtteranceSumAggregateOutputType = {
    start: number | null;
    end: number | null;
};
export type UtteranceMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    meetingId: string | null;
    speaker: string | null;
    text: string | null;
    start: number | null;
    end: number | null;
};
export type UtteranceMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    meetingId: string | null;
    speaker: string | null;
    text: string | null;
    start: number | null;
    end: number | null;
};
export type UtteranceCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    meetingId: number;
    speaker: number;
    text: number;
    start: number;
    end: number;
    _all: number;
};
export type UtteranceAvgAggregateInputType = {
    start?: true;
    end?: true;
};
export type UtteranceSumAggregateInputType = {
    start?: true;
    end?: true;
};
export type UtteranceMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    meetingId?: true;
    speaker?: true;
    text?: true;
    start?: true;
    end?: true;
};
export type UtteranceMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    meetingId?: true;
    speaker?: true;
    text?: true;
    start?: true;
    end?: true;
};
export type UtteranceCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    meetingId?: true;
    speaker?: true;
    text?: true;
    start?: true;
    end?: true;
    _all?: true;
};
export type UtteranceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Utterance to aggregate.
     */
    where?: Prisma.UtteranceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Utterances to fetch.
     */
    orderBy?: Prisma.UtteranceOrderByWithRelationInput | Prisma.UtteranceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UtteranceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Utterances from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Utterances.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Utterances
    **/
    _count?: true | UtteranceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UtteranceAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UtteranceSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UtteranceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UtteranceMaxAggregateInputType;
};
export type GetUtteranceAggregateType<T extends UtteranceAggregateArgs> = {
    [P in keyof T & keyof AggregateUtterance]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUtterance[P]> : Prisma.GetScalarType<T[P], AggregateUtterance[P]>;
};
export type UtteranceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UtteranceWhereInput;
    orderBy?: Prisma.UtteranceOrderByWithAggregationInput | Prisma.UtteranceOrderByWithAggregationInput[];
    by: Prisma.UtteranceScalarFieldEnum[] | Prisma.UtteranceScalarFieldEnum;
    having?: Prisma.UtteranceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UtteranceCountAggregateInputType | true;
    _avg?: UtteranceAvgAggregateInputType;
    _sum?: UtteranceSumAggregateInputType;
    _min?: UtteranceMinAggregateInputType;
    _max?: UtteranceMaxAggregateInputType;
};
export type UtteranceGroupByOutputType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    meetingId: string;
    speaker: string;
    text: string;
    start: number;
    end: number;
    _count: UtteranceCountAggregateOutputType | null;
    _avg: UtteranceAvgAggregateOutputType | null;
    _sum: UtteranceSumAggregateOutputType | null;
    _min: UtteranceMinAggregateOutputType | null;
    _max: UtteranceMaxAggregateOutputType | null;
};
type GetUtteranceGroupByPayload<T extends UtteranceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UtteranceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UtteranceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UtteranceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UtteranceGroupByOutputType[P]>;
}>>;
export type UtteranceWhereInput = {
    AND?: Prisma.UtteranceWhereInput | Prisma.UtteranceWhereInput[];
    OR?: Prisma.UtteranceWhereInput[];
    NOT?: Prisma.UtteranceWhereInput | Prisma.UtteranceWhereInput[];
    id?: Prisma.StringFilter<"Utterance"> | string;
    createdAt?: Prisma.DateTimeFilter<"Utterance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Utterance"> | Date | string;
    meetingId?: Prisma.StringFilter<"Utterance"> | string;
    speaker?: Prisma.StringFilter<"Utterance"> | string;
    text?: Prisma.StringFilter<"Utterance"> | string;
    start?: Prisma.IntFilter<"Utterance"> | number;
    end?: Prisma.IntFilter<"Utterance"> | number;
    meeting?: Prisma.XOR<Prisma.MeetingScalarRelationFilter, Prisma.MeetingWhereInput>;
};
export type UtteranceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    meetingId?: Prisma.SortOrder;
    speaker?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    start?: Prisma.SortOrder;
    end?: Prisma.SortOrder;
    meeting?: Prisma.MeetingOrderByWithRelationInput;
};
export type UtteranceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.UtteranceWhereInput | Prisma.UtteranceWhereInput[];
    OR?: Prisma.UtteranceWhereInput[];
    NOT?: Prisma.UtteranceWhereInput | Prisma.UtteranceWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Utterance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Utterance"> | Date | string;
    meetingId?: Prisma.StringFilter<"Utterance"> | string;
    speaker?: Prisma.StringFilter<"Utterance"> | string;
    text?: Prisma.StringFilter<"Utterance"> | string;
    start?: Prisma.IntFilter<"Utterance"> | number;
    end?: Prisma.IntFilter<"Utterance"> | number;
    meeting?: Prisma.XOR<Prisma.MeetingScalarRelationFilter, Prisma.MeetingWhereInput>;
}, "id">;
export type UtteranceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    meetingId?: Prisma.SortOrder;
    speaker?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    start?: Prisma.SortOrder;
    end?: Prisma.SortOrder;
    _count?: Prisma.UtteranceCountOrderByAggregateInput;
    _avg?: Prisma.UtteranceAvgOrderByAggregateInput;
    _max?: Prisma.UtteranceMaxOrderByAggregateInput;
    _min?: Prisma.UtteranceMinOrderByAggregateInput;
    _sum?: Prisma.UtteranceSumOrderByAggregateInput;
};
export type UtteranceScalarWhereWithAggregatesInput = {
    AND?: Prisma.UtteranceScalarWhereWithAggregatesInput | Prisma.UtteranceScalarWhereWithAggregatesInput[];
    OR?: Prisma.UtteranceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UtteranceScalarWhereWithAggregatesInput | Prisma.UtteranceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Utterance"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Utterance"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Utterance"> | Date | string;
    meetingId?: Prisma.StringWithAggregatesFilter<"Utterance"> | string;
    speaker?: Prisma.StringWithAggregatesFilter<"Utterance"> | string;
    text?: Prisma.StringWithAggregatesFilter<"Utterance"> | string;
    start?: Prisma.IntWithAggregatesFilter<"Utterance"> | number;
    end?: Prisma.IntWithAggregatesFilter<"Utterance"> | number;
};
export type UtteranceCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    speaker: string;
    text: string;
    start: number;
    end: number;
    meeting: Prisma.MeetingCreateNestedOneWithoutUtterancesInput;
};
export type UtteranceUncheckedCreateInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    meetingId: string;
    speaker: string;
    text: string;
    start: number;
    end: number;
};
export type UtteranceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    speaker?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    start?: Prisma.IntFieldUpdateOperationsInput | number;
    end?: Prisma.IntFieldUpdateOperationsInput | number;
    meeting?: Prisma.MeetingUpdateOneRequiredWithoutUtterancesNestedInput;
};
export type UtteranceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    meetingId?: Prisma.StringFieldUpdateOperationsInput | string;
    speaker?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    start?: Prisma.IntFieldUpdateOperationsInput | number;
    end?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UtteranceCreateManyInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    meetingId: string;
    speaker: string;
    text: string;
    start: number;
    end: number;
};
export type UtteranceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    speaker?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    start?: Prisma.IntFieldUpdateOperationsInput | number;
    end?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UtteranceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    meetingId?: Prisma.StringFieldUpdateOperationsInput | string;
    speaker?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    start?: Prisma.IntFieldUpdateOperationsInput | number;
    end?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UtteranceListRelationFilter = {
    every?: Prisma.UtteranceWhereInput;
    some?: Prisma.UtteranceWhereInput;
    none?: Prisma.UtteranceWhereInput;
};
export type UtteranceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UtteranceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    meetingId?: Prisma.SortOrder;
    speaker?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    start?: Prisma.SortOrder;
    end?: Prisma.SortOrder;
};
export type UtteranceAvgOrderByAggregateInput = {
    start?: Prisma.SortOrder;
    end?: Prisma.SortOrder;
};
export type UtteranceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    meetingId?: Prisma.SortOrder;
    speaker?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    start?: Prisma.SortOrder;
    end?: Prisma.SortOrder;
};
export type UtteranceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    meetingId?: Prisma.SortOrder;
    speaker?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    start?: Prisma.SortOrder;
    end?: Prisma.SortOrder;
};
export type UtteranceSumOrderByAggregateInput = {
    start?: Prisma.SortOrder;
    end?: Prisma.SortOrder;
};
export type UtteranceCreateNestedManyWithoutMeetingInput = {
    create?: Prisma.XOR<Prisma.UtteranceCreateWithoutMeetingInput, Prisma.UtteranceUncheckedCreateWithoutMeetingInput> | Prisma.UtteranceCreateWithoutMeetingInput[] | Prisma.UtteranceUncheckedCreateWithoutMeetingInput[];
    connectOrCreate?: Prisma.UtteranceCreateOrConnectWithoutMeetingInput | Prisma.UtteranceCreateOrConnectWithoutMeetingInput[];
    createMany?: Prisma.UtteranceCreateManyMeetingInputEnvelope;
    connect?: Prisma.UtteranceWhereUniqueInput | Prisma.UtteranceWhereUniqueInput[];
};
export type UtteranceUncheckedCreateNestedManyWithoutMeetingInput = {
    create?: Prisma.XOR<Prisma.UtteranceCreateWithoutMeetingInput, Prisma.UtteranceUncheckedCreateWithoutMeetingInput> | Prisma.UtteranceCreateWithoutMeetingInput[] | Prisma.UtteranceUncheckedCreateWithoutMeetingInput[];
    connectOrCreate?: Prisma.UtteranceCreateOrConnectWithoutMeetingInput | Prisma.UtteranceCreateOrConnectWithoutMeetingInput[];
    createMany?: Prisma.UtteranceCreateManyMeetingInputEnvelope;
    connect?: Prisma.UtteranceWhereUniqueInput | Prisma.UtteranceWhereUniqueInput[];
};
export type UtteranceUpdateManyWithoutMeetingNestedInput = {
    create?: Prisma.XOR<Prisma.UtteranceCreateWithoutMeetingInput, Prisma.UtteranceUncheckedCreateWithoutMeetingInput> | Prisma.UtteranceCreateWithoutMeetingInput[] | Prisma.UtteranceUncheckedCreateWithoutMeetingInput[];
    connectOrCreate?: Prisma.UtteranceCreateOrConnectWithoutMeetingInput | Prisma.UtteranceCreateOrConnectWithoutMeetingInput[];
    upsert?: Prisma.UtteranceUpsertWithWhereUniqueWithoutMeetingInput | Prisma.UtteranceUpsertWithWhereUniqueWithoutMeetingInput[];
    createMany?: Prisma.UtteranceCreateManyMeetingInputEnvelope;
    set?: Prisma.UtteranceWhereUniqueInput | Prisma.UtteranceWhereUniqueInput[];
    disconnect?: Prisma.UtteranceWhereUniqueInput | Prisma.UtteranceWhereUniqueInput[];
    delete?: Prisma.UtteranceWhereUniqueInput | Prisma.UtteranceWhereUniqueInput[];
    connect?: Prisma.UtteranceWhereUniqueInput | Prisma.UtteranceWhereUniqueInput[];
    update?: Prisma.UtteranceUpdateWithWhereUniqueWithoutMeetingInput | Prisma.UtteranceUpdateWithWhereUniqueWithoutMeetingInput[];
    updateMany?: Prisma.UtteranceUpdateManyWithWhereWithoutMeetingInput | Prisma.UtteranceUpdateManyWithWhereWithoutMeetingInput[];
    deleteMany?: Prisma.UtteranceScalarWhereInput | Prisma.UtteranceScalarWhereInput[];
};
export type UtteranceUncheckedUpdateManyWithoutMeetingNestedInput = {
    create?: Prisma.XOR<Prisma.UtteranceCreateWithoutMeetingInput, Prisma.UtteranceUncheckedCreateWithoutMeetingInput> | Prisma.UtteranceCreateWithoutMeetingInput[] | Prisma.UtteranceUncheckedCreateWithoutMeetingInput[];
    connectOrCreate?: Prisma.UtteranceCreateOrConnectWithoutMeetingInput | Prisma.UtteranceCreateOrConnectWithoutMeetingInput[];
    upsert?: Prisma.UtteranceUpsertWithWhereUniqueWithoutMeetingInput | Prisma.UtteranceUpsertWithWhereUniqueWithoutMeetingInput[];
    createMany?: Prisma.UtteranceCreateManyMeetingInputEnvelope;
    set?: Prisma.UtteranceWhereUniqueInput | Prisma.UtteranceWhereUniqueInput[];
    disconnect?: Prisma.UtteranceWhereUniqueInput | Prisma.UtteranceWhereUniqueInput[];
    delete?: Prisma.UtteranceWhereUniqueInput | Prisma.UtteranceWhereUniqueInput[];
    connect?: Prisma.UtteranceWhereUniqueInput | Prisma.UtteranceWhereUniqueInput[];
    update?: Prisma.UtteranceUpdateWithWhereUniqueWithoutMeetingInput | Prisma.UtteranceUpdateWithWhereUniqueWithoutMeetingInput[];
    updateMany?: Prisma.UtteranceUpdateManyWithWhereWithoutMeetingInput | Prisma.UtteranceUpdateManyWithWhereWithoutMeetingInput[];
    deleteMany?: Prisma.UtteranceScalarWhereInput | Prisma.UtteranceScalarWhereInput[];
};
export type UtteranceCreateWithoutMeetingInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    speaker: string;
    text: string;
    start: number;
    end: number;
};
export type UtteranceUncheckedCreateWithoutMeetingInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    speaker: string;
    text: string;
    start: number;
    end: number;
};
export type UtteranceCreateOrConnectWithoutMeetingInput = {
    where: Prisma.UtteranceWhereUniqueInput;
    create: Prisma.XOR<Prisma.UtteranceCreateWithoutMeetingInput, Prisma.UtteranceUncheckedCreateWithoutMeetingInput>;
};
export type UtteranceCreateManyMeetingInputEnvelope = {
    data: Prisma.UtteranceCreateManyMeetingInput | Prisma.UtteranceCreateManyMeetingInput[];
    skipDuplicates?: boolean;
};
export type UtteranceUpsertWithWhereUniqueWithoutMeetingInput = {
    where: Prisma.UtteranceWhereUniqueInput;
    update: Prisma.XOR<Prisma.UtteranceUpdateWithoutMeetingInput, Prisma.UtteranceUncheckedUpdateWithoutMeetingInput>;
    create: Prisma.XOR<Prisma.UtteranceCreateWithoutMeetingInput, Prisma.UtteranceUncheckedCreateWithoutMeetingInput>;
};
export type UtteranceUpdateWithWhereUniqueWithoutMeetingInput = {
    where: Prisma.UtteranceWhereUniqueInput;
    data: Prisma.XOR<Prisma.UtteranceUpdateWithoutMeetingInput, Prisma.UtteranceUncheckedUpdateWithoutMeetingInput>;
};
export type UtteranceUpdateManyWithWhereWithoutMeetingInput = {
    where: Prisma.UtteranceScalarWhereInput;
    data: Prisma.XOR<Prisma.UtteranceUpdateManyMutationInput, Prisma.UtteranceUncheckedUpdateManyWithoutMeetingInput>;
};
export type UtteranceScalarWhereInput = {
    AND?: Prisma.UtteranceScalarWhereInput | Prisma.UtteranceScalarWhereInput[];
    OR?: Prisma.UtteranceScalarWhereInput[];
    NOT?: Prisma.UtteranceScalarWhereInput | Prisma.UtteranceScalarWhereInput[];
    id?: Prisma.StringFilter<"Utterance"> | string;
    createdAt?: Prisma.DateTimeFilter<"Utterance"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Utterance"> | Date | string;
    meetingId?: Prisma.StringFilter<"Utterance"> | string;
    speaker?: Prisma.StringFilter<"Utterance"> | string;
    text?: Prisma.StringFilter<"Utterance"> | string;
    start?: Prisma.IntFilter<"Utterance"> | number;
    end?: Prisma.IntFilter<"Utterance"> | number;
};
export type UtteranceCreateManyMeetingInput = {
    id?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    speaker: string;
    text: string;
    start: number;
    end: number;
};
export type UtteranceUpdateWithoutMeetingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    speaker?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    start?: Prisma.IntFieldUpdateOperationsInput | number;
    end?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UtteranceUncheckedUpdateWithoutMeetingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    speaker?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    start?: Prisma.IntFieldUpdateOperationsInput | number;
    end?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UtteranceUncheckedUpdateManyWithoutMeetingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    speaker?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    start?: Prisma.IntFieldUpdateOperationsInput | number;
    end?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type UtteranceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    meetingId?: boolean;
    speaker?: boolean;
    text?: boolean;
    start?: boolean;
    end?: boolean;
    meeting?: boolean | Prisma.MeetingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["utterance"]>;
export type UtteranceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    meetingId?: boolean;
    speaker?: boolean;
    text?: boolean;
    start?: boolean;
    end?: boolean;
    meeting?: boolean | Prisma.MeetingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["utterance"]>;
export type UtteranceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    meetingId?: boolean;
    speaker?: boolean;
    text?: boolean;
    start?: boolean;
    end?: boolean;
    meeting?: boolean | Prisma.MeetingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["utterance"]>;
export type UtteranceSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    meetingId?: boolean;
    speaker?: boolean;
    text?: boolean;
    start?: boolean;
    end?: boolean;
};
export type UtteranceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "meetingId" | "speaker" | "text" | "start" | "end", ExtArgs["result"]["utterance"]>;
export type UtteranceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    meeting?: boolean | Prisma.MeetingDefaultArgs<ExtArgs>;
};
export type UtteranceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    meeting?: boolean | Prisma.MeetingDefaultArgs<ExtArgs>;
};
export type UtteranceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    meeting?: boolean | Prisma.MeetingDefaultArgs<ExtArgs>;
};
export type $UtterancePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Utterance";
    objects: {
        meeting: Prisma.$MeetingPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        meetingId: string;
        speaker: string;
        text: string;
        start: number;
        end: number;
    }, ExtArgs["result"]["utterance"]>;
    composites: {};
};
export type UtteranceGetPayload<S extends boolean | null | undefined | UtteranceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UtterancePayload, S>;
export type UtteranceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UtteranceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UtteranceCountAggregateInputType | true;
};
export interface UtteranceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Utterance'];
        meta: {
            name: 'Utterance';
        };
    };
    /**
     * Find zero or one Utterance that matches the filter.
     * @param {UtteranceFindUniqueArgs} args - Arguments to find a Utterance
     * @example
     * // Get one Utterance
     * const utterance = await prisma.utterance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UtteranceFindUniqueArgs>(args: Prisma.SelectSubset<T, UtteranceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UtteranceClient<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Utterance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UtteranceFindUniqueOrThrowArgs} args - Arguments to find a Utterance
     * @example
     * // Get one Utterance
     * const utterance = await prisma.utterance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UtteranceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UtteranceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UtteranceClient<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Utterance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtteranceFindFirstArgs} args - Arguments to find a Utterance
     * @example
     * // Get one Utterance
     * const utterance = await prisma.utterance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UtteranceFindFirstArgs>(args?: Prisma.SelectSubset<T, UtteranceFindFirstArgs<ExtArgs>>): Prisma.Prisma__UtteranceClient<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Utterance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtteranceFindFirstOrThrowArgs} args - Arguments to find a Utterance
     * @example
     * // Get one Utterance
     * const utterance = await prisma.utterance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UtteranceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UtteranceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UtteranceClient<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Utterances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtteranceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Utterances
     * const utterances = await prisma.utterance.findMany()
     *
     * // Get first 10 Utterances
     * const utterances = await prisma.utterance.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const utteranceWithIdOnly = await prisma.utterance.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UtteranceFindManyArgs>(args?: Prisma.SelectSubset<T, UtteranceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Utterance.
     * @param {UtteranceCreateArgs} args - Arguments to create a Utterance.
     * @example
     * // Create one Utterance
     * const Utterance = await prisma.utterance.create({
     *   data: {
     *     // ... data to create a Utterance
     *   }
     * })
     *
     */
    create<T extends UtteranceCreateArgs>(args: Prisma.SelectSubset<T, UtteranceCreateArgs<ExtArgs>>): Prisma.Prisma__UtteranceClient<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Utterances.
     * @param {UtteranceCreateManyArgs} args - Arguments to create many Utterances.
     * @example
     * // Create many Utterances
     * const utterance = await prisma.utterance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UtteranceCreateManyArgs>(args?: Prisma.SelectSubset<T, UtteranceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Utterances and returns the data saved in the database.
     * @param {UtteranceCreateManyAndReturnArgs} args - Arguments to create many Utterances.
     * @example
     * // Create many Utterances
     * const utterance = await prisma.utterance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Utterances and only return the `id`
     * const utteranceWithIdOnly = await prisma.utterance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UtteranceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UtteranceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Utterance.
     * @param {UtteranceDeleteArgs} args - Arguments to delete one Utterance.
     * @example
     * // Delete one Utterance
     * const Utterance = await prisma.utterance.delete({
     *   where: {
     *     // ... filter to delete one Utterance
     *   }
     * })
     *
     */
    delete<T extends UtteranceDeleteArgs>(args: Prisma.SelectSubset<T, UtteranceDeleteArgs<ExtArgs>>): Prisma.Prisma__UtteranceClient<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Utterance.
     * @param {UtteranceUpdateArgs} args - Arguments to update one Utterance.
     * @example
     * // Update one Utterance
     * const utterance = await prisma.utterance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UtteranceUpdateArgs>(args: Prisma.SelectSubset<T, UtteranceUpdateArgs<ExtArgs>>): Prisma.Prisma__UtteranceClient<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Utterances.
     * @param {UtteranceDeleteManyArgs} args - Arguments to filter Utterances to delete.
     * @example
     * // Delete a few Utterances
     * const { count } = await prisma.utterance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UtteranceDeleteManyArgs>(args?: Prisma.SelectSubset<T, UtteranceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Utterances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtteranceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Utterances
     * const utterance = await prisma.utterance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UtteranceUpdateManyArgs>(args: Prisma.SelectSubset<T, UtteranceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Utterances and returns the data updated in the database.
     * @param {UtteranceUpdateManyAndReturnArgs} args - Arguments to update many Utterances.
     * @example
     * // Update many Utterances
     * const utterance = await prisma.utterance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Utterances and only return the `id`
     * const utteranceWithIdOnly = await prisma.utterance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UtteranceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UtteranceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Utterance.
     * @param {UtteranceUpsertArgs} args - Arguments to update or create a Utterance.
     * @example
     * // Update or create a Utterance
     * const utterance = await prisma.utterance.upsert({
     *   create: {
     *     // ... data to create a Utterance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Utterance we want to update
     *   }
     * })
     */
    upsert<T extends UtteranceUpsertArgs>(args: Prisma.SelectSubset<T, UtteranceUpsertArgs<ExtArgs>>): Prisma.Prisma__UtteranceClient<runtime.Types.Result.GetResult<Prisma.$UtterancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Utterances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtteranceCountArgs} args - Arguments to filter Utterances to count.
     * @example
     * // Count the number of Utterances
     * const count = await prisma.utterance.count({
     *   where: {
     *     // ... the filter for the Utterances we want to count
     *   }
     * })
    **/
    count<T extends UtteranceCountArgs>(args?: Prisma.Subset<T, UtteranceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UtteranceCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Utterance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtteranceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UtteranceAggregateArgs>(args: Prisma.Subset<T, UtteranceAggregateArgs>): Prisma.PrismaPromise<GetUtteranceAggregateType<T>>;
    /**
     * Group by Utterance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtteranceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UtteranceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UtteranceGroupByArgs['orderBy'];
    } : {
        orderBy?: UtteranceGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UtteranceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUtteranceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Utterance model
     */
    readonly fields: UtteranceFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Utterance.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UtteranceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    meeting<T extends Prisma.MeetingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MeetingDefaultArgs<ExtArgs>>): Prisma.Prisma__MeetingClient<runtime.Types.Result.GetResult<Prisma.$MeetingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Utterance model
 */
export interface UtteranceFieldRefs {
    readonly id: Prisma.FieldRef<"Utterance", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Utterance", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Utterance", 'DateTime'>;
    readonly meetingId: Prisma.FieldRef<"Utterance", 'String'>;
    readonly speaker: Prisma.FieldRef<"Utterance", 'String'>;
    readonly text: Prisma.FieldRef<"Utterance", 'String'>;
    readonly start: Prisma.FieldRef<"Utterance", 'Int'>;
    readonly end: Prisma.FieldRef<"Utterance", 'Int'>;
}
/**
 * Utterance findUnique
 */
export type UtteranceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceInclude<ExtArgs> | null;
    /**
     * Filter, which Utterance to fetch.
     */
    where: Prisma.UtteranceWhereUniqueInput;
};
/**
 * Utterance findUniqueOrThrow
 */
export type UtteranceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceInclude<ExtArgs> | null;
    /**
     * Filter, which Utterance to fetch.
     */
    where: Prisma.UtteranceWhereUniqueInput;
};
/**
 * Utterance findFirst
 */
export type UtteranceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceInclude<ExtArgs> | null;
    /**
     * Filter, which Utterance to fetch.
     */
    where?: Prisma.UtteranceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Utterances to fetch.
     */
    orderBy?: Prisma.UtteranceOrderByWithRelationInput | Prisma.UtteranceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Utterances.
     */
    cursor?: Prisma.UtteranceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Utterances from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Utterances.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Utterances.
     */
    distinct?: Prisma.UtteranceScalarFieldEnum | Prisma.UtteranceScalarFieldEnum[];
};
/**
 * Utterance findFirstOrThrow
 */
export type UtteranceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceInclude<ExtArgs> | null;
    /**
     * Filter, which Utterance to fetch.
     */
    where?: Prisma.UtteranceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Utterances to fetch.
     */
    orderBy?: Prisma.UtteranceOrderByWithRelationInput | Prisma.UtteranceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Utterances.
     */
    cursor?: Prisma.UtteranceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Utterances from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Utterances.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Utterances.
     */
    distinct?: Prisma.UtteranceScalarFieldEnum | Prisma.UtteranceScalarFieldEnum[];
};
/**
 * Utterance findMany
 */
export type UtteranceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceInclude<ExtArgs> | null;
    /**
     * Filter, which Utterances to fetch.
     */
    where?: Prisma.UtteranceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Utterances to fetch.
     */
    orderBy?: Prisma.UtteranceOrderByWithRelationInput | Prisma.UtteranceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Utterances.
     */
    cursor?: Prisma.UtteranceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Utterances from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Utterances.
     */
    skip?: number;
    distinct?: Prisma.UtteranceScalarFieldEnum | Prisma.UtteranceScalarFieldEnum[];
};
/**
 * Utterance create
 */
export type UtteranceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceInclude<ExtArgs> | null;
    /**
     * The data needed to create a Utterance.
     */
    data: Prisma.XOR<Prisma.UtteranceCreateInput, Prisma.UtteranceUncheckedCreateInput>;
};
/**
 * Utterance createMany
 */
export type UtteranceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Utterances.
     */
    data: Prisma.UtteranceCreateManyInput | Prisma.UtteranceCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Utterance createManyAndReturn
 */
export type UtteranceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * The data used to create many Utterances.
     */
    data: Prisma.UtteranceCreateManyInput | Prisma.UtteranceCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Utterance update
 */
export type UtteranceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceInclude<ExtArgs> | null;
    /**
     * The data needed to update a Utterance.
     */
    data: Prisma.XOR<Prisma.UtteranceUpdateInput, Prisma.UtteranceUncheckedUpdateInput>;
    /**
     * Choose, which Utterance to update.
     */
    where: Prisma.UtteranceWhereUniqueInput;
};
/**
 * Utterance updateMany
 */
export type UtteranceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Utterances.
     */
    data: Prisma.XOR<Prisma.UtteranceUpdateManyMutationInput, Prisma.UtteranceUncheckedUpdateManyInput>;
    /**
     * Filter which Utterances to update
     */
    where?: Prisma.UtteranceWhereInput;
    /**
     * Limit how many Utterances to update.
     */
    limit?: number;
};
/**
 * Utterance updateManyAndReturn
 */
export type UtteranceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * The data used to update Utterances.
     */
    data: Prisma.XOR<Prisma.UtteranceUpdateManyMutationInput, Prisma.UtteranceUncheckedUpdateManyInput>;
    /**
     * Filter which Utterances to update
     */
    where?: Prisma.UtteranceWhereInput;
    /**
     * Limit how many Utterances to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Utterance upsert
 */
export type UtteranceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceInclude<ExtArgs> | null;
    /**
     * The filter to search for the Utterance to update in case it exists.
     */
    where: Prisma.UtteranceWhereUniqueInput;
    /**
     * In case the Utterance found by the `where` argument doesn't exist, create a new Utterance with this data.
     */
    create: Prisma.XOR<Prisma.UtteranceCreateInput, Prisma.UtteranceUncheckedCreateInput>;
    /**
     * In case the Utterance was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UtteranceUpdateInput, Prisma.UtteranceUncheckedUpdateInput>;
};
/**
 * Utterance delete
 */
export type UtteranceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceInclude<ExtArgs> | null;
    /**
     * Filter which Utterance to delete.
     */
    where: Prisma.UtteranceWhereUniqueInput;
};
/**
 * Utterance deleteMany
 */
export type UtteranceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Utterances to delete
     */
    where?: Prisma.UtteranceWhereInput;
    /**
     * Limit how many Utterances to delete.
     */
    limit?: number;
};
/**
 * Utterance without action
 */
export type UtteranceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utterance
     */
    select?: Prisma.UtteranceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Utterance
     */
    omit?: Prisma.UtteranceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UtteranceInclude<ExtArgs> | null;
};
export {};
