'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const frequencies = ['all', 'yearly', 'monthly', 'weekly', 'daily'] as const

export function FrequencySwitch({ currentFrequency }: { currentFrequency: typeof frequencies[number] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();


  const handleFrequencyChange = (newFrequency: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    const basePath = `/dashboard/history/${newFrequency}`;
    const queryString = currentParams.toString();
    const newUrl = queryString ? `${basePath}?${queryString}` : basePath;

    router.push(newUrl)
  }

  return (
    <Tabs value={currentFrequency} onValueChange={handleFrequencyChange}>
      <TabsList>
        {frequencies.map((freq) => (
          <TabsTrigger key={freq} value={freq} className="capitalize">
            {freq}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

