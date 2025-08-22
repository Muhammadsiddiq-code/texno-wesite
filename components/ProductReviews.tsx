"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, User } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Review {
  id: string
  phoneId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

interface ProductReviewsProps {
  phoneId: string
}

export default function ProductReviews({ phoneId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }

    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]")
    const phoneReviews = allReviews.filter((review: Review) => review.phoneId === phoneId)
    setReviews(phoneReviews)
  }, [phoneId])

  const handleSubmitReview = () => {
    if (!currentUser) {
      toast({
        title: "Kirish talab qilinadi",
        description: "Sharh qoldirish uchun hisobingizga kiring",
        variant: "destructive",
      })
      return
    }

    if (!newReview.comment.trim()) {
      toast({
        title: "Xatolik",
        description: "Sharh matnini kiriting",
        variant: "destructive",
      })
      return
    }

    const review: Review = {
      id: Date.now().toString(),
      phoneId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date().toISOString(),
    }

    const allReviews = JSON.parse(localStorage.getItem("reviews") || "[]")
    allReviews.push(review)
    localStorage.setItem("reviews", JSON.stringify(allReviews))

    setReviews((prev) => [review, ...prev])
    setNewReview({ rating: 5, comment: "" })

    toast({
      title: "Sharh qo'shildi",
      description: "Sizning sharhingiz muvaffaqiyatli qo'shildi",
    })
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <span>Sharhlar va Reytinglar</span>
            <span className="text-sm text-white/70">({reviews.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-white">{averageRating.toFixed(1)}</div>
            {renderStars(Math.round(averageRating))}
            <div className="text-white/70">{reviews.length} sharh</div>
          </div>
        </CardContent>
      </Card>

      {/* Add Review */}
      {currentUser && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sharh qoldiring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white text-sm mb-2 block">Reyting</label>
              {renderStars(newReview.rating, true, (rating) => setNewReview((prev) => ({ ...prev, rating })))}
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">Sharh</label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="Mahsulot haqida fikringizni yozing..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                rows={4}
              />
            </div>
            <Button
              onClick={handleSubmitReview}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Sharh qo'shish
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{review.userName}</h4>
                      <span className="text-white/50 text-sm">
                        {new Date(review.createdAt).toLocaleDateString("uz-UZ")}
                      </span>
                    </div>
                    <div className="mb-2">{renderStars(review.rating)}</div>
                    <p className="text-white/80">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {reviews.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="pt-6 text-center">
              <p className="text-white/70">Hozircha sharhlar yo'q. Birinchi bo'lib sharh qoldiring!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
