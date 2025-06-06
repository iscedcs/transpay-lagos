'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createNewPassword } from '@/actions/set-new-password'
import { toast } from 'sonner'
import { DialogClose } from '@radix-ui/react-dialog'

interface SetNewPasswordDialogProps {
  userId: string
}

export function PasswordChanger({ userId }: SetNewPasswordDialogProps) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match",
          {
            description: "Please make sure your passwords match."
        })
      return
    }

    setIsLoading(true)
    const result = await createNewPassword(userId, newPassword)
    setIsLoading(false)

    if (result.success) {
      toast.success("Password updated",{
        description: "The new password has been set successfully.",
      })
    } else {
      toast.error("Error",{
        description: result.error,
      })
    }
  }

  return (
      <Dialog>
          <DialogTrigger asChild>
              <Button>Set New Password</Button>
          </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set New Password</DialogTitle>
          <DialogDescription>
            Enter a new password for the user. This will override their current password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="newPassword" className="">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid items-center gap-4">
              <Label htmlFor="confirmPassword" className="">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline">
                Cancel
            </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Setting...' : 'Set New Password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

