'use client';

import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    provider: z.enum(['GEMINI', 'ASSEMBLYAI']),
    key: z.string().min(5, 'API Key is required.'),
});

export function ApiKeyForm({ onSuccess }: { onSuccess?: () => void }) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof schema>) => {
            return api.post('/api-keys', values);
        },
        onSuccess: () => {
            toast.success('API Key stored securely');
            queryClient.invalidateQueries({ queryKey: ['api-keys'] });
            form.reset();
            if (onSuccess) onSuccess();
        },
        onError: () => {
            toast.error('Failed to save API key.');
        },
    });

    const form = useForm({
        defaultValues: {
            name: '',
            provider: 'GEMINI' as 'GEMINI' | 'ASSEMBLYAI',
            key: '',
        },
        validatorAdapter: zodValidator(),
        validators: {
            onChange: schema,
        },
        onSubmit: async ({ value }) => {
            mutation.mutate(value);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="space-y-4"
        >
            {/* Key Name Field */}
            <form.Field
                name="name"
                children={(field) => (
                    <div className="space-y-1">
                        <Label htmlFor={field.name}>Key Name</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="My Gemini Pro Key"
                        />
                        {field.state.meta.errors ? (
                            <p className="text-destructive text-xs">
                                {field.state.meta.errors.join(', ')}
                            </p>
                        ) : null}
                    </div>
                )}
            />

            {/* Provider Selection */}
            <form.Field
                name="provider"
                children={(field) => (
                    <div className="space-y-1">
                        <Label>Provider</Label>
                        <Select
                            value={field.state.value}
                            onValueChange={(value) => field.handleChange(value as any)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GEMINI">Google Gemini</SelectItem>
                                <SelectItem value="ASSEMBLYAI">AssemblyAI</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            />

            {/* API Key Field */}
            <form.Field
                name="key"
                children={(field) => (
                    <div className="space-y-1">
                        <Label htmlFor={field.name}>API Key</Label>
                        <Input
                            id={field.name}
                            type="password"
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Enter your key"
                        />
                        {field.state.meta.errors ? (
                            <p className="text-destructive text-xs">
                                {field.state.meta.errors.join(', ')}
                            </p>
                        ) : null}
                    </div>
                )}
            />

            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!canSubmit || isSubmitting || mutation.isPending}
                    >
                        {isSubmitting || mutation.isPending ? 'Saving...' : 'Save Key'}
                    </Button>
                )}
            />
        </form>
    );
}
