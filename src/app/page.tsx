"use client"

import { useState } from "react"
import Link from "next/link"
import { trackButtonClick, trackPricingPlanView } from "@/lib/analytics"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ContactSalesDialog } from "@/components/contact-sales-dialog"
import { Bot, Zap, Shield, BarChart3, Clock, Users, Star, ArrowRight, Check } from "lucide-react"

export default function HomePage() {
  const [showContactDialog, setShowContactDialog] = useState(false)

  const handleContactSalesClick = (location: string) => {
    trackButtonClick('contact_sales', location)
    setShowContactDialog(true)
  }

  const handleStartTrialClick = (location: string) => {
    trackButtonClick('start_free_trial', location)
    setShowContactDialog(true)
  }

  const handlePricingPlanClick = (planName: string) => {
    trackPricingPlanView(planName)
    setShowContactDialog(true)
  }

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "Intelligent AI Agent",
      description: "Advanced AI that understands context and delivers personalized responses to your customers 24/7."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Sub-second response times ensure your customers never wait for answers."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2 compliance and end-to-end encryption."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Deep insights into customer interactions and AI performance metrics."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Availability",
      description: "Your AI agent never sleeps, providing round-the-clock customer support."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-Channel",
      description: "Deploy across web, mobile, Slack, Teams, and other platforms seamlessly."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Customer Success",
      company: "TechFlow Inc",
      avatar: "SC",
      content: "AgentPro reduced our support ticket volume by 60% while improving customer satisfaction scores. The AI truly understands our business context.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Operations",
      company: "DataSync Solutions",
      avatar: "MR",
      content: "Implementation was seamless and the ROI was immediate. Our customers love the instant, accurate responses they get at any hour.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "CEO",
      company: "CloudScale Ventures",
      avatar: "EW",
      content: "Game-changer for our scaling business. The AI agent handles complex queries better than most human agents we've tried.",
      rating: 5
    }
  ]

  const pricingFeatures = [
    "Advanced AI conversation engine",
    "Real-time analytics dashboard",
    "Multi-channel deployment",
    "Custom integrations",
    "Priority support",
    "SOC 2 compliance"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">AgentPro</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#testimonials" className="text-slate-600 hover:text-slate-900 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
          </nav>
          <Button onClick={() => handleContactSalesClick('header')}>
            Contact Sales
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <Badge variant="secondary" className="mb-4">
          🚀 Trusted by 500+ companies
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Transform Customer Support with
          <span className="text-blue-600 block">Intelligent AI Agents</span>
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Deploy enterprise-grade AI agents that understand your business, speak your brand voice,
          and deliver exceptional customer experiences at scale.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => handleStartTrialClick('hero')} className="text-lg px-8">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8" asChild>
            <Link href="/dashboard">
              View Dashboard Demo
            </Link>
          </Button>
        </div>
        <div className="mt-12 text-sm text-slate-500">
          No credit card required • 14-day free trial • Setup in minutes
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful features designed for modern businesses that demand excellence in customer experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-slate-600">
              See what our customers are saying about AgentPro
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-slate-700 leading-relaxed text-base">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.role}</div>
                      <div className="text-sm text-slate-500">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-slate-600">
            Choose the plan that scales with your business
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Professional</CardTitle>
              <div className="text-4xl font-bold text-slate-900 mt-4">
                $299<span className="text-lg font-normal text-slate-600">/month</span>
              </div>
              <CardDescription>Perfect for growing teams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pricingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
              <Button className="w-full mt-6" onClick={() => handlePricingPlanClick('professional')}>
                Start Free Trial
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 shadow-xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-600 text-white">Most Popular</Badge>
            </div>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <div className="text-4xl font-bold text-slate-900 mt-4">
                Custom<span className="text-lg font-normal text-slate-600"> pricing</span>
              </div>
              <CardDescription>For large organizations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pricingFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-slate-700">Custom integrations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-slate-700">Dedicated success manager</span>
              </div>
              <Button className="w-full mt-6" onClick={() => handlePricingPlanClick('enterprise')}>
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to transform your customer support?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using AgentPro to deliver exceptional customer experiences.
          </p>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" onClick={() => handleStartTrialClick('cta_section')}>
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Bot className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">AgentPro</span>
            </div>
            <div className="flex space-x-6 text-slate-600">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-slate-600">
            © 2025 AgentPro. All rights reserved.
          </div>
        </div>
      </footer>

      <ContactSalesDialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
      />
    </div>
  )
}
