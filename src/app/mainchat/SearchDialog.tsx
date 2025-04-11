import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Phone, UserPlus } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

interface User {
  id: number;
  name: string;
  phone: string;
  status: string;
  sdob: string;
  avatar: string;
  isFriend: boolean;
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [p, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState<User | null>(null)
  const [isAddingFriend, setIsAddingFriend] = useState(false)
  const [friendRequestMessage, setFriendRequestMessage] = useState("")


  const handleSearch = async () => {
    // Check if the input is a valid phone number (simple check for demo)
    //   function t(p: string) {
    //
    //
    //   const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    //
    //   return !!p.match(regexPhoneNumber);
    //
    // }
    if (/^\d{11}$/.test(p)) {

      const queryString = new URLSearchParams({ p }).toString();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/fnp?${queryString}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},

      });

      const result = await response.json();


      if (result) {
        const uid = result['data']['data']['uid'];
        const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/fuid?id=${uid}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},

        });
        const  a = await r.json();

        setSearchResult({

          id: uid,
          name: result['data']['data']['display_name'],
          phone: p,
          status: result['data']['data']['status'],
          sdob: result['data']['data']['sdob'],
          avatar: result['data']['data']['avatar'],
          isFriend: false,
        });
      } else {
        setSearchResult(null);
        toast({
          title: "User Not Found",
          description: "No user found with the provided phone number.",
          variant: "destructive"
        });
      }
    }


    // Simulating a search request
    // In a real application, this would be an API call

  }

  const handleAddFriend = async () => {
    if (!searchResult) return;

    setIsAddingFriend(true);
    try {
      // Thực hiện API call để gửi lời mời kết bạn
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/acp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fid: searchResult.id,
          m: friendRequestMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send friend request');
      }

      // Cập nhật trạng thái UI
      setSearchResult({ ...searchResult, isFriend: true });

      toast({
        title: "Đã gửi lời mời kết bạn",
        description: `Lời mời kết bạn đã được gửi đến ${searchResult.name}.`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi gửi lời mời kết bạn. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsAddingFriend(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tìm Kiếm Người Dùng Qua Số Điện Thoại</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Input
              id="phone"
              placeholder="Nhập Số Điện Thoại"
              value={p}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="col-span-3"
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Tìm Kiếm
            </Button>
          </div>
          {searchResult && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img src={searchResult.avatar} alt={searchResult.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="text-lg font-semibold">{searchResult.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{searchResult.phone}</p>
                  </div>
                </div>
                {!searchResult.isFriend && (
                  <Button onClick={handleAddFriend} disabled={isAddingFriend}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {isAddingFriend ? 'Đang gửi ...' : 'Kết bạn'}
                  </Button>

                )}
              </div>
              <Textarea
                  placeholder="Nhập tin nhắn kèm theo lời mời kết bạn..."
                  value={friendRequestMessage}
                  onChange={(e) => setFriendRequestMessage(e.target.value)}
                  className="mt-2"
              />
              <hr/>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className='font-bold'>{searchResult.phone}</span>
                </div>
                <div className="flex items-center gap-2">

                  <span className="font-bold">Tiểu sử: {searchResult.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <p>Sinh Nhật:</p>
                  <span> {searchResult.sdob}</span>

                </div>
              </div>

            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
