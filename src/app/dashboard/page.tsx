"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Bot,
  BarChart3,
  MessageSquare,
  Users,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Send,
  MoreVertical
} from "lucide-react"

export default function DashboardPage() {
  const [selectedAgent, setSelectedAgent] = useState("customer-support")
  const [newMessage, setNewMessage] = useState("")

  const agents = [
    {
      id: "customer-support",
      name: "Customer Support Agent",
      status: "active",
      conversations: 156,
      satisfaction: 4.8
    },
    {
      id: "sales-assistant",
      name: "Sales Assistant",
      status: "active",
      conversations: 89,
      satisfaction: 4.9
    },
    {
      id: "technical-support",
      name: "Technical Support",
      status: "training",
      conversations: 23,
      satisfaction: 4.6
    }
  ]

  const recentConversations = [
    {
      id: 1,
      customer: "Alice Johnson",
      agent: "Customer Support Agent",
      status: "resolved",
      duration: "3m 24s",
      satisfaction: 5,
      timestamp: "2 minutes ago"
    },
    {
      id: 2,
      customer: "Bob Wilson",
      agent: "Sales Assistant",
      status: "ongoing",
      duration: "1m 12s",
      satisfaction: null,
      timestamp: "5 minutes ago"
    },
    {
      id: 3,
      customer: "Carol Davis",
      agent: "Customer Support Agent",
      status: "resolved",
      duration: "7m 45s",
      satisfaction: 4,
      timestamp: "12 minutes ago"
    }
  ]

  const testMessages = [
    {
      id: 1,
      role: "user",
      content: "Hi, I'm having trouble with my account login",
      timestamp: "10:30 AM"
    },
    {
      id: 2,
      role: "assistant",
      content: "I'd be happy to help you with your login issue. Can you tell me what specific error message you're seeing when you try to log in?",
      timestamp: "10:30 AM"
    },
    {
      id: 3,
      role: "user",
      content: "It says 'invalid credentials' but I'm sure my password is correct",
      timestamp: "10:31 AM"
    },
    {
      id: 4,
      role: "assistant",
      content: "I understand how frustrating that can be. Let me help you reset your password to ensure you can access your account. I'll also check if there have been any recent security updates that might affect your login. Would you like me to send a password reset link to your registered email address?",
      timestamp: "10:31 AM"
    }
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // Simulate sending message
    setNewMessage("")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
              <Bot className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">AgentPro Dashboard</h1>
                <p className="text-sm text-slate-600">Manage your AI agents and monitor performance</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-slate-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a href="#" className="flex items-center space-x-3 text-slate-900 bg-slate-100 rounded-lg px-3 py-2">
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Overview</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg px-3 py-2 transition-colors">
              <Bot className="h-5 w-5" />
              <span>AI Agents</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg px-3 py-2 transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span>Conversations</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg px-3 py-2 transition-colors">
              <Users className="h-5 w-5" />
              <span>Customers</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg px-3 py-2 transition-colors">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Total Conversations
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">1,247</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Avg Response Time
                </CardTitle>
                <Clock className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">1.2s</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  15% faster
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Customer Satisfaction
                </CardTitle>
                <Users className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">4.8/5</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Active Agents
                </CardTitle>
                <Bot className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">3</div>
                <p className="text-xs text-slate-600 mt-1">
                  2 active, 1 training
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Agents */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>AI Agents</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Agent
                  </Button>
                </div>
                <CardDescription>
                  Manage your AI agents and their performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">{agent.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span>{agent.conversations} conversations</span>
                          <span>★ {agent.satisfaction}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                        {agent.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Test Agent */}
            <Card>
              <CardHeader>
                <CardTitle>Test Agent</CardTitle>
                <CardDescription>
                  Test your AI agent responses in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4 h-64 overflow-y-auto">
                    {testMessages.map((message) => (
                      <div key={message.id} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                        <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-slate-200 text-slate-900"
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.role === "user" ? "text-blue-100" : "text-slate-500"}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Conversations */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>
                Latest customer interactions across all agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentConversations.map((conversation) => (
                  <div key={conversation.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{conversation.customer.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-slate-900">{conversation.customer}</h4>
                        <p className="text-sm text-slate-600">{conversation.agent}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge variant={conversation.status === "resolved" ? "default" : "secondary"}>
                            {conversation.status === "resolved" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {conversation.status}
                          </Badge>
                          {conversation.satisfaction && (
                            <span className="text-sm text-slate-600">★ {conversation.satisfaction}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {conversation.duration} • {conversation.timestamp}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
