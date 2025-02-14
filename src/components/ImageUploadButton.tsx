import { useRef } from "react"
import { Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React

interface ImageUploadButtonProps {
    onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function ImageUploadButton({ onImageSelect }: ImageUploadButtonProps) {
    const imageInputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        imageInputRef.current?.click()
    }

    return (
        <>
            <input
                type="file"
                ref={imageInputRef}
                onChange={onImageSelect}
                multiple
                className="hidden"
                id="image-upload"
                accept="image/*"
            />
            <Button onClick={handleClick} variant="outline" size="icon">
                <Image size={20} />
            </Button>
        </>
    )
}

