"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Mail, MapPin, Phone, DollarSign, User } from "lucide-react"
import { useAuth } from "../context/auth-context"

interface UserData {
  username: string
  email: string
  province: string
  balance: number
  phone_number: string
  profile_img: string
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState("personal")
  const [editUser, setEditUser] = useState<UserData | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditUser(prev => ({ ...prev!, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editUser) {
      updateUser(editUser)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              alt={user?.username}
              src={process.env.NEXT_PUBLIC_BASE_URL + user?.profile_img}
            />
            <AvatarFallback>{user?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">{user?.username}</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setEditUser(user)}>
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={editUser?.username || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editUser?.email || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    name="province"
                    value={editUser?.province || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={editUser?.phone_number || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-4">
              <div className="flex items-center space-x-3">
                <User className="text-gray-400" />
                <span>Username: {user?.username}</span>
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <MapPin className="text-gray-400" />
                <span>Province: {user?.province}</span>
              </div>
            </TabsContent>
            <TabsContent value="contact" className="mt-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <Phone className="text-gray-400" />
                <span>{user?.phone_number}</span>
              </div>
            </TabsContent>
            <TabsContent value="financial" className="mt-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="text-gray-400" />
                <span>Balance: ${user?.balance?.toFixed(2)}</span>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}