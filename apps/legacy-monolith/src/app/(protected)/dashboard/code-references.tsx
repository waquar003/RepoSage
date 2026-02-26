"use client"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileCode, File } from "lucide-react"

type Props = {
   filesReferences: { fileName: string, sourceCode: string, summary: string }[]
}

const CodeReferences = ({ filesReferences }: Props) => {
   const [tab, setTab] = React.useState(filesReferences[0]?.fileName)

   if (filesReferences.length === 0) return null

   return (
       <div className="w-full">
           <Tabs value={tab} onValueChange={setTab}>
               <ScrollArea className="w-full">
                   <div className="flex gap-2 bg-secondary/80 p-2 rounded-lg mb-4">
                       {filesReferences.map(file => (
                           <button 
                               onClick={() => setTab(file.fileName)} 
                               key={file.fileName} 
                               className={cn(
                                   'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap',
                                   'flex items-center gap-2 hover:bg-secondary',
                                   {
                                       'bg-primary text-primary-foreground shadow-sm': tab === file.fileName,
                                       'text-muted-foreground': tab !== file.fileName
                                   }
                               )}
                           >
                               <File className="h-4 w-4" />
                               {file.fileName}
                           </button>
                       ))}
                   </div>
               </ScrollArea>

               {filesReferences.map(file => (
                   <TabsContent 
                       key={file.fileName} 
                       value={file.fileName}
                   >
                       <div className="rounded-lg border bg-card">
                           <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/50">
                               <FileCode className="h-4 w-4 text-muted-foreground" />
                               <span className="font-medium">{file.fileName}</span>
                           </div>
                           <ScrollArea className="h-[400px]">
                               <SyntaxHighlighter 
                                   language="typescript" 
                                   style={lucario}
                                   customStyle={{
                                       margin: 0,
                                       borderRadius: '0 0 8px 8px'
                                   }}
                               >
                                   {file.sourceCode}
                               </SyntaxHighlighter>
                           </ScrollArea>
                       </div>
                   </TabsContent>
               ))}
           </Tabs>
       </div>
   )
}

export default CodeReferences