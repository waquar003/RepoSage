// 'use client'

// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import useProject from "@/hooks/use-project"
// import { api } from "@/trpc/react";
// import React from "react";
// import AskQuestionCard from "../dashboard/ask-question-card";
// import MDEditor from "@uiw/react-md-editor";
// import CodeReferences from "../dashboard/code-references";

// const QAPage = () => {
//     const { projectId } = useProject();
//     const { data: questions } = api.project.getQuestions.useQuery({ projectId })

//     const [questionIndex, setQuestionIndex] = React.useState(0)
//     const question = questions?.[questionIndex]

//     return (
//         <Sheet>
//             <AskQuestionCard />
//             <div className="h-4"></div>


//             <h1 className="text-xl font-semibold">Saved Questions</h1>
//             <div className="h-2"></div>
//             <div className="flex flex-col gap-2">
//                 {questions?.map((question, index) => 
//                     <React.Fragment key={question.id}>
//                         <SheetTrigger onClick={() => setQuestionIndex(index)}>
//                             <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow border">
//                                 <img className="rounded-full" height={30} width={30} src={question.user.imageUrl ?? ""} />

//                                 <div className="text-left flex flex-col">
//                                     <div className="flex items-center gap-2">
//                                         <p className="text-gray-700 line-clamp-1 text-lg font-medium">
//                                             {question.question}
//                                         </p>
//                                         <span className="text-xs text-gray-400 whitespace-nowrap">
//                                             {question.createdAt.toLocaleDateString()}
//                                         </span>
//                                     </div>
//                                     <p className="text-gray-500 line-clamp-1 text-sm">
//                                         {question.answer}
//                                     </p>
//                                 </div>
//                             </div>
//                         </SheetTrigger>
//                     </React.Fragment>
//                 )}
//             </div>

//             {question && (
//                 <SheetContent className="sm:max-w-[80vw]">
//                     <SheetHeader>
//                         <SheetTitle>
//                             {question.question}
//                         </SheetTitle>
//                         <MDEditor.Markdown source={question.answer} />
//                         <CodeReferences filesReferences={(question.filesReferences ?? []) as any} />
//                     </SheetHeader>
//                 </SheetContent>
//             )}
//         </Sheet>
//     )
// }

// export default QAPage

'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import useProject from "@/hooks/use-project"
import { api } from "@/trpc/react";
import React from "react";
import AskQuestionCard from "../dashboard/ask-question-card";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

const QAPage = () => {
    const { projectId } = useProject();
    const { data: questions } = api.project.getQuestions.useQuery({ projectId })

    const [questionIndex, setQuestionIndex] = React.useState(0)
    const question = questions?.[questionIndex]

    return (
        <Sheet>
            <AskQuestionCard />
            <div className="h-4"></div>

            <Card>
                <CardHeader>
                    <CardTitle>Saved Questions</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="flex flex-col gap-2">
                {questions?.map((question, index) => 
                    <React.Fragment key={question.id}>
                        <SheetTrigger onClick={() => setQuestionIndex(index)}>
                            <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow border">
                                <img className="rounded-full" height={30} width={30} src={question.user.imageUrl ?? ""} />

                                <div className="text-left flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-700 line-clamp-1 text-lg font-medium">
                                        {question.question}
                                        </p>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {question.createdAt.toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-500 text-sm">
                                        <p className="line-clamp-1">{question.answer}</p>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {formatDistanceToNow(question.createdAt, { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </SheetTrigger>
                    </React.Fragment>
                )}
            </div>
                </CardContent>
            </Card>

            

            {question && (
                <SheetContent className="sm:max-w-[80vw]">
                    <SheetHeader>
                        <SheetTitle>
                            {question.question}
                        </SheetTitle>
                        <MDEditor.Markdown source={question.answer} />
                        <CodeReferences filesReferences={(question.filesReferences ?? []) as any} />
                    </SheetHeader>
                </SheetContent>
            )}
        </Sheet>
    )
}

export default QAPage



// 'use client'
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import useProject from "@/hooks/use-project"
// import { api } from "@/trpc/react";
// import React from "react";
// import AskQuestionCard from "../dashboard/ask-question-card";
// import MDEditor from "@uiw/react-md-editor";
// import CodeReferences from "../dashboard/code-references";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { formatDistanceToNow } from 'date-fns';

// const QAPage = () => {
//     const { projectId } = useProject();
//     const { data: questions } = api.project.getQuestions.useQuery({ projectId });
//     const [questionIndex, setQuestionIndex] = React.useState(0);
//     const question = questions?.[questionIndex];

//     return (
//         <Sheet>
//             <div className="space-y-6">
//                 <AskQuestionCard />
                
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Saved Questions</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <ScrollArea className="h-[50vh]">
//                             <div className="space-y-4 pr-4">
//                                 {questions?.map((q, index) => (
//                                     <SheetTrigger 
//                                         key={q.id} 
//                                         onClick={() => setQuestionIndex(index)}
//                                         className="w-full"
//                                     >
//                                         <Card className="cursor-pointer hover:bg-accent transition-colors w-full">
//                                             <CardContent className="flex items-center gap-4 p-4">
//                                                 <Avatar>
//                                                     <AvatarImage src={q.user.imageUrl ?? ""} alt={q.user.name ?? "User"} />
//                                                     <AvatarFallback>{q.user.name?.[0] ?? "U"}</AvatarFallback>
//                                                 </Avatar>
//                                                 <div className="flex-1 min-w-0 text-left">
//                                                     <p className="text-sm font-medium text-foreground truncate">
//                                                         {q.question}
//                                                     </p>
//                                                     <p className="text-sm text-muted-foreground truncate">
//                                                         {q.answer}
//                                                     </p>
//                                                 </div>
//                                                 <span className="text-xs text-muted-foreground whitespace-nowrap">
//                                                     {formatDistanceToNow(q.createdAt, { addSuffix: true })}
//                                                 </span>
//                                             </CardContent>
//                                         </Card>
//                                     </SheetTrigger>
//                                 ))}
//                             </div>
//                         </ScrollArea>
//                     </CardContent>
//                 </Card>
//             </div>

//             {question && (
//                 <SheetContent className="sm:max-w-[600px]">
//                     <SheetHeader className="space-y-6">
//                         <SheetTitle className="text-xl font-bold">
//                             {question.question}
//                         </SheetTitle>
//                         <ScrollArea className="h-[calc(100vh-8rem)]">
//                             <div className="space-y-6 pr-4">
//                                 <div className="prose dark:prose-invert max-w-none">
//                                     <MDEditor.Markdown source={question.answer} />
//                                 </div>
//                                 <Separator />
//                                 <div>
//                                     <h3 className="text-lg font-semibold mb-2">Code References</h3>
//                                     <CodeReferences filesReferences={(question.filesReferences ?? []) as any} />
//                                 </div>
//                             </div>
//                         </ScrollArea>
//                     </SheetHeader>
//                 </SheetContent>
//             )}
//         </Sheet>
//     )
// }

// export default QAPage