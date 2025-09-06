"use client"

import { useState, useEffect } from "react"
import { Share2, Facebook, Twitter, PhoneIcon as WhatsApp, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function ShareRide() {
  const [shareUrl, setShareUrl] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Set the share URL when the component mounts
    setShareUrl(window.location.href)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast({
          title: "Link copied",
          description: "The ride info link has been copied to your clipboard.",
        })
      })
      .catch((err) => console.error("Failed to copy: ", err))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <Share2 className="h-4 w-4" />
          Share Ride Info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Ride Information</DialogTitle>
          <DialogDescription>Share your ride details with others for safety.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input value={shareUrl} readOnly />
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="flex gap-2"
              onClick={() =>
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
              }
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="flex gap-2"
              onClick={() =>
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, "_blank")
              }
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              className="flex gap-2"
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, "_blank")}
            >
              <WhatsApp className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
          <Button onClick={copyToClipboard} className="flex gap-2">
            <Copy className="h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

