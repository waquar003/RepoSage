'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Upload, Zap, ChevronRight, Check } from 'lucide-react';
import { redirect } from 'next/navigation';

const FeatureCard = ({
    icon: Icon,
    title,
    description,
}: {
    icon: any;
    title: string;
    description: string;
}) => (
    <Card className="group hover:border-primary transition-all duration-300">
        <CardHeader>
            <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300">
                <Icon className="text-primary h-6 w-6" />
            </div>
            <CardTitle className="mb-2 text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

const TestimonialCard = ({
    name,
    role,
    company,
    avatar,
    quote,
}: {
    name: string;
    role: string;
    company: string;
    avatar: string;
    quote: string;
}) => (
    <Card className="flex h-full flex-col justify-between">
        <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4 italic">"{quote}"</p>
            <div className="flex items-center">
                <Avatar className="mr-4">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-muted-foreground text-sm">
                        {role}, {company}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function LandingPage() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //TODO: Handle email submission logic here
        console.log('Email submitted:', email);
    };

    return (
        <div className="from-background to-background via-primary/5 flex min-h-screen flex-col bg-gradient-to-b">
            <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/reposage-logo-v2.svg"
                            alt="RepoSage Logo"
                            width={40}
                            height={40}
                        />
                        <span className="from-primary to-primary-foreground bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                            RepoSage
                        </span>
                    </Link>
                    <nav className="hidden space-x-4 md:flex">
                        <Link
                            href="#features"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="#demo"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            Demo
                        </Link>
                        <Link
                            href="#testimonials"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            Testimonials
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            Pricing
                        </Link>
                    </nav>
                    <Button
                        onClick={() => {
                            redirect('/sign-up');
                        }}
                    >
                        Get Started
                    </Button>
                </div>
            </header>

            <main className="grow">
                <section className="py-20 md:py-32">
                    <div className="container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="from-primary to-primary-foreground mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                                Master Your Codebase with Contextual Insights
                            </h1>
                            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl md:text-2xl">
                                Empower your team with AI-driven code understanding and seamless
                                project communication.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Button size="lg" className="group">
                                    Start Free Trial
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                                <Button size="lg" variant="outline">
                                    Watch Demo
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="features" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <FeatureCard
                                icon={MessageSquare}
                                title="Interactive Q&A"
                                description="Ask questions about your project and receive detailed answers with links to relevant code files."
                            />
                            <FeatureCard
                                icon={Upload}
                                title="Meeting Audio Upload"
                                description="Upload missed meeting audio and get AI-generated summaries of key discussion points."
                            />
                            <FeatureCard
                                icon={Zap}
                                title="User-Friendly Interface"
                                description="Enjoy a clean, intuitive, and responsive design for seamless access across all devices."
                            />
                        </div>
                    </div>
                </section>

                <section id="demo" className="bg-muted py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-12 text-center text-3xl font-bold">
                            See RepoSage in Action
                        </h2>
                        <Tabs defaultValue="github" className="mx-auto max-w-3xl">
                            <TabsList className="mb-8 grid w-full grid-cols-3">
                                <TabsTrigger value="github">GitHub Integration</TabsTrigger>
                                <TabsTrigger value="qa">Interactive Q&A</TabsTrigger>
                                <TabsTrigger value="audio">Meeting Audio</TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="github"
                                className="bg-card rounded-lg p-6 shadow-lg"
                            >
                                <h3 className="mb-4 text-xl font-semibold">
                                    GitHub Integration Demo
                                </h3>
                                <p className="mb-4">
                                    See how RepoSage integrates with your GitHub repositories:
                                </p>
                                <ul className="mb-4 list-inside list-disc space-y-2">
                                    <li>Automatic commit summaries</li>
                                    <li>Codebase context generation</li>
                                    <li>Pull request analysis</li>
                                </ul>
                                <Button>Try GitHub Integration</Button>
                            </TabsContent>
                            <TabsContent value="qa" className="bg-card rounded-lg p-6 shadow-lg">
                                <h3 className="mb-4 text-xl font-semibold">Interactive Q&A Demo</h3>
                                <p className="mb-4">Experience our powerful Q&A feature:</p>
                                <ul className="mb-4 list-inside list-disc space-y-2">
                                    <li>Ask questions about your codebase</li>
                                    <li>Receive detailed answers with code snippets</li>
                                    <li>Get links to relevant files</li>
                                </ul>
                                <Button>Try Interactive Q&A</Button>
                            </TabsContent>
                            <TabsContent value="audio" className="bg-card rounded-lg p-6 shadow-lg">
                                <h3 className="mb-4 text-xl font-semibold">
                                    Meeting Audio Upload Demo
                                </h3>
                                <p className="mb-4">See how RepoSage handles meeting audio:</p>
                                <ul className="mb-4 list-inside list-disc space-y-2">
                                    <li>Upload meeting recordings</li>
                                    <li>Get AI-generated summaries</li>
                                    <li>Extract action items and decisions</li>
                                </ul>
                                <Button>Try Audio Upload</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                <section id="testimonials" className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-12 text-center text-3xl font-bold">What Our Users Say</h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <TestimonialCard
                                name="Alex Johnson"
                                role="Lead Developer"
                                company="TechCorp"
                                avatar="/placeholder.svg?height=100&width=100"
                                quote="RepoSage has revolutionized our development workflow. It's like having an AI assistant that understands our entire codebase."
                            />
                            <TestimonialCard
                                name="Sarah Lee"
                                role="Product Manager"
                                company="InnovateSoft"
                                avatar="/placeholder.svg?height=100&width=100"
                                quote="The meeting audio feature is a game-changer. I never miss important details, even when I can't attend every meeting."
                            />
                            <TestimonialCard
                                name="Michael Chen"
                                role="CTO"
                                company="StartupX"
                                avatar="/placeholder.svg?height=100&width=100"
                                quote="RepoSage has significantly reduced onboarding time for new developers. It's an essential tool for any growing tech team."
                            />
                        </div>
                    </div>
                </section>

                <section id="pricing" className="bg-muted py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-12 text-center text-3xl font-bold">
                            Simple, Transparent Pricing
                        </h2>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
                            {['Starter', 'Pro', 'Enterprise'].map((plan) => (
                                <Card
                                    key={plan}
                                    className={`flex flex-col ${plan === 'Pro' ? 'border-primary' : ''}`}
                                >
                                    <CardHeader>
                                        <CardTitle>{plan}</CardTitle>
                                        <CardDescription>
                                            {plan === 'Starter' && 'Perfect for small teams'}
                                            {plan === 'Pro' && 'Best for growing companies'}
                                            {plan === 'Enterprise' && 'For large organizations'}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="mb-4 text-3xl font-bold">
                                            {plan === 'Starter' && '$49'}
                                            {plan === 'Pro' && '$99'}
                                            {plan === 'Enterprise' && 'Custom'}
                                            <span className="text-muted-foreground text-sm font-normal">
                                                {plan !== 'Enterprise' && '/month'}
                                            </span>
                                        </p>
                                        <ul className="mb-4 space-y-2">
                                            {[
                                                'GitHub Integration',
                                                'Interactive Q&A',
                                                'Meeting Audio Upload',
                                            ].map((feature) => (
                                                <li key={feature} className="flex items-center">
                                                    <Check className="text-primary mr-2 h-5 w-5" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardContent>
                                        <Button
                                            className="w-full"
                                            variant={plan === 'Pro' ? 'default' : 'outline'}
                                        >
                                            {plan === 'Enterprise'
                                                ? 'Contact Sales'
                                                : 'Get Started'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="mb-6 text-3xl font-bold">
                            Ready to Enhance Your Development Workflow?
                        </h2>
                        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
                            Join thousands of developers who are already benefiting from RepoSage's
                            powerful features.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row"
                        >
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="grow"
                            />
                            <Button type="submit">Get Started</Button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="bg-muted">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div>
                            <h3 className="mb-4 font-semibold">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 font-semibold">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 font-semibold">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Documentation
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Support
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        API
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 font-semibold">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-muted-foreground mt-8 border-t pt-8 text-center">
                        <p>&copy; {new Date().getFullYear()} RepoSage. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
