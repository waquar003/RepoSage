import { SignUp } from '@clerk/nextjs';
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50">
      <div className="w-full max-w-md">
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "bg-background shadow-lg rounded-lg p-8",
              headerTitle: "text-2xl font-bold text-foreground",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
              footerAction: "text-muted-foreground hover:text-primary",
              formField: "mb-4",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-background border-input",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground",
              socialButtonsBlockButton: "border-input bg-background text-foreground hover:bg-muted",
              socialButtonsBlockButtonText: "text-foreground",
            },
          }}
        />
      </div>
    </div>
  );
}