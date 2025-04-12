"use client"
import { Search, Plus, UserPlus, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import {Avatar, AvatarImage} from "@/components/ui/avatar";
type Tag = {
  text: string;
  color: string;
};
type Member = {
  name: string;
  online: Date | boolean;
};
type group = {
  id: string;
  groupId : string;
  name: string
  avt : string;
  fullAvt : string;
  avatar: string;
  isGroup: boolean;
  totalMember : number;
  isActive: boolean
  displayName: string
  lastActionTime: number
  online: boolean
  unread: number
  type: string
  createdAt: Date | boolean
  members:Member[];
  createdDate : string
  lastMessage : {
    sender: string
    text: string
    timestamp: string
  }
  tags?: Tag[]
};

interface GroupsItemProps {
  groups: {
    id: string;
    groupId : string;
    name: string
    avatar: string;
    isGroup: boolean;
    totalMember : number;
    isActive: boolean
    displayName: string
    lastActionTime: number
    online: boolean
    unread: number
    type: string
    members:Member[];
    lastMessage : {
      sender: string
      text: string
      timestamp: string
    }
    lastOnline :string
    tags?: Tag[]
  }
  index: number
  isSelected?: boolean
  onClick: () => void
  isCollapsed?: boolean

}

// Custom hook for fetching groups
function useGroups() {
  const [groups, setGroups] = useState<group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();


  useEffect(() => {
    async function fetchGroups() {
      try {
        setLoading(true);

        // Get the Zalo data from localStorage
        const rawData = localStorage.getItem('dataZalo')as string;
        console.log("rawData", rawData);
        const zaloData = JSON.parse(rawData);
        console.log("zaloData", zaloData[0]);
        const i = zaloData[0].imei;
        const e = zaloData[0].zpw_enk;
        const s = zaloData[0].zpw_sek;




        // Make the API request with the extracted parameters
        const response = await fetch(`${process.env.API_URL}api/gag`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ i, e, s })
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch groups: ${response.status}`);
        }


        const responseData = await response.json();
        console.log("API response:", responseData);

        // Check if the response has the expected structure with success and data properties
        if (responseData.success && Array.isArray(responseData.data)) {
          setGroups(responseData.data);
        } else if (Array.isArray(responseData)) {
          // Fallback in case the API returns a direct array
          setGroups(responseData);
        } else {
          // Handle unexpected response format
          console.error("Unexpected API response format:", responseData);
          setGroups([]);
        }

        // Store in localStorage for offline access
        if (typeof window !== 'undefined') {
          // Store the groups array, not the whole response
          const groupsToCache = responseData.success && Array.isArray(responseData.data)
              ? responseData.data
              : (Array.isArray(responseData) ? responseData : []);

          localStorage.setItem('cachedGroups', JSON.stringify(groupsToCache));
          localStorage.setItem('groupsCacheTime', Date.now().toString());
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Đã xảy ra lỗi không xác định.");
        }
        console.error('Error fetching groups:', err);

        // Try to load from cache if API call fails
        if (typeof window !== 'undefined') {
          const cachedData = localStorage.getItem('cachedGroups');
          if (cachedData) {
            try {
              setGroups(JSON.parse(cachedData));
            } catch (parseError) {
              console.error('Error parsing cached groups:', parseError);
            }
          }
        }
      } finally {
        setLoading(false);
      }
    }

    // Handle server-side rendering case first
    if (typeof window === 'undefined') {
      // On server, we'll just set loading to false since we can't fetch
      setLoading(false);
      return;
    }

    // On client side, try to show cached data immediately for better UX
    try {
      const cachedData = localStorage.getItem('cachedGroups');
      const cacheTime = localStorage.getItem('groupsCacheTime');

      // Use cache if it exists and is less than 1 hour old
      const cacheAge = cacheTime ? Date.now() - parseInt(cacheTime) : Infinity;
      const CACHE_MAX_AGE = 60 * 60 * 1000; // 1 hour in milliseconds

      if (cachedData && cacheAge < CACHE_MAX_AGE) {
        setGroups(JSON.parse(cachedData));
        setLoading(false);

        // If cache is older than 5 minutes, refresh in background
        if (cacheAge > 5 * 60 * 1000) {
          fetchGroups();
        }
      } else {
        // No valid cache, do a normal fetch
        fetchGroups();
      }
    } catch (err) {
      console.error('Error reading from cache:', err);
      fetchGroups();
    }
  }, []);

  return { groups, loading, error };
}


type GroupsSidebarProps = {
  onContactSelect: (contact: group) => void;
  selectedContact: group | null; // ✅ sửa dòng này
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};
export default function ContactsSidebar({
                                          onContactSelect,
                                          selectedContact,
                                          isCollapsed,
                                          onToggleCollapse,
                                        }: GroupsSidebarProps) {

  const { groups, loading, error } = useGroups();



  return (
      <div
          className={`${
              isCollapsed ? "w-20" : "w-80"
          } bg-white border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300 ease-in-out relative`}
      >
        {/* Collapse Toggle Button */}
        <button
            onClick={onToggleCollapse}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-md z-10 transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg active:scale-95 border border-blue-400"
        >
          {isCollapsed ? (
              <ChevronRight size={18} className="animate-pulse-gentle" />
          ) : (
              <ChevronLeft size={18} className="animate-pulse-gentle" />
          )}
        </button>

        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden flex items-center justify-center text-white">
              <UserPlus size={18} />
            </div>
            {!isCollapsed && <h1 className="font-semibold text-gray-800">Nhóm</h1>}
          </div>
          {!isCollapsed && (
              <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Plus size={20} />
              </Button>
          )}
        </div>

        {/* Search Bar Only */}
        {!isCollapsed && (
            <div className="p-4">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Tìm kiếm nhóm"
                    className="pl-9 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-blue-500"
                />
              </div>
            </div>
        )}

        {/* Groups List */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed ? "px-1" : "px-2"}`}>
          {loading ? (
              // Loading state
              <div className="flex justify-center items-center h-40">
                <div className="animate-pulse flex flex-col space-y-3 w-full p-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center space-x-3">
                        <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
          ) : error ? (
              // Error state
              <div className="flex flex-col items-center justify-center h-40 p-4 text-center">
                <div className="text-red-500 mb-2">Không thể tải nhóm</div>
                <p className="text-sm text-gray-500">Đang hiển thị dữ liệu đã lưu trong bộ nhớ tạm</p>
                <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => window.location.reload()}
                >
                  Thử lại
                </Button>
              </div>
          ) : groups.length === 0 ? (
              // Empty state
              <div className="flex flex-col items-center justify-center h-40 p-4 text-center">
                <div className="text-gray-500 mb-2">Không có nhóm nào</div>
              </div>
          ) : (
              // Groups list
              groups.map((group, index:  number) => (
                  <GroupItem
                      index={index} //
                      key={group.groupId}
                      groups={{
                        id: group.groupId,
                        groupId: group.groupId,
                        name: group.name,
                        avatar: group.avt || group.fullAvt || "/placeholder.svg",
                        isGroup: true,
                        totalMember: group.totalMember,
                        displayName: group.name,
                        isActive: true, // hoặc group.isActive nếu có
                        lastActionTime: Date.now(), // hoặc group.lastActionTime nếu có
                        online: true, // hoặc group.online nếu có
                        unread: 0, // hoặc group.unread nếu bạn có logic
                        type: "group",
                        members: Array(group.totalMember || 0).fill(0).map((_, i) => ({
                          name: `Member ${i + 1}`,
                          online: false,
                        })),
                        lastMessage: {
                          sender: "System",
                          text: `Nhóm có ${group.totalMember || 0} thành viên`,
                          timestamp: group.createdDate || "Unknown",
                        },
                        lastOnline: group.createdDate,
                        tags: [
                          {
                            text: "Nhóm",
                            color: "blue",
                          },
                        ],
                      }}
                      isSelected={selectedContact?.id === group.groupId}
                      onClick={() => onContactSelect(group)}
                      isCollapsed={isCollapsed}
                  />

              ))
          )}
        </div>

        {/* Bottom Button */}
        {!isCollapsed && (
            <div className="p-4 border-t border-gray-100">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-5 shadow-sm">
                <Plus size={16} className="mr-2" />
                Tạo nhóm mới
              </Button>
            </div>
        )}
      </div>
  )
}

function GroupItem({ groups, isSelected, onClick, isCollapsed  } :GroupsItemProps ) {
  const getTypeColor = (type:string) => {
    switch (type) {
      case "work":
        return "bg-purple-100 text-purple-800"
      case "family":
        return "bg-red-100 text-red-800"
      case "friends":
        return "bg-green-100 text-green-800"
      case "hobby":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeText = (type:string) => {
    switch (type) {
      case "work":
        return "Công việc"
      case "family":
        return "Gia đình"
      case "friends":
        return "Bạn bè"
      case "hobby":
        return "Sở thích"
      default:
        return "Khác"
    }
  }



  const groupAvatar = (
      <div className="relative">
        <div
            className={`${isCollapsed ? "w-10 h-10" : "w-12 h-12"} rounded-full overflow-hidden shadow-sm transition-all duration-300`}
        >
          {groups.avatar ? (
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={groups.avatar} alt={groups.name} /> </Avatar>
          ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white font-medium">
                {groups.name.charAt(0)}
              </div>
          )}
        </div>
        {groups.isActive && (
            <div
                className={`absolute bottom-0 right-0 ${isCollapsed ? "w-3 h-3" : "w-3.5 h-3.5"} bg-green-500 rounded-full border-2 border-white shadow-sm`}
            ></div>
        )}
        {groups.unread > 0 && !isCollapsed && (
            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
              {groups.unread}
            </div>
        )}
      </div>
  )

  if (isCollapsed) {
    return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                  className={`flex justify-center p-2 my-1 rounded-xl cursor-pointer transition-all duration-200 relative ${
                      isSelected ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500" : "hover:bg-gray-50"
                  }`}
                  onClick={onClick}
              >
                {groupAvatar}
                {groups.unread > 0 && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                      {groups.unread}
                    </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div>
                <div className="font-medium">{groups.name}</div>
                <div className="flex items-center gap-1.5 mt-1">
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${getTypeColor(groups.type)}`}>
                  {getTypeText(groups.type)}
                </span>
                  <span className="text-xs text-gray-500">{groups.members.length} thành viên</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  <span className="font-medium">{groups.lastMessage.sender}:</span> {groups.lastMessage.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">{groups.lastMessage.timestamp}</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    )
  }

  return (
      <div
          className={`flex items-center gap-3 p-3 my-1 rounded-xl cursor-pointer transition-all duration-200 ${
              isSelected ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500" : "hover:bg-gray-50"
          }`}
          onClick={onClick}
      >
        {groupAvatar}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className={`font-medium ${isSelected ? "text-blue-700" : "text-gray-800"}`}>{groups.name}</div>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${getTypeColor(groups.type)}`}>
            {getTypeText(groups.type)}
          </span>
          </div>
          <div className="flex justify-between items-center mt-0.5">
            <div className="text-xs text-gray-500 truncate">
              <span className="font-medium">{groups.lastMessage.sender}:</span> {groups.lastMessage.text}
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap ml-2">{groups.lastMessage.timestamp}</div>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex -space-x-2">
              {groups.members.slice(0, 3).map((member:any, idx:number) => (
                  <div
                      key={idx}
                      className={`w-5 h-5 rounded-full border border-white ${member.online ? "bg-green-100" : "bg-gray-100"}`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-[8px] font-medium">
                      {member.name.charAt(0)}
                    </div>
                  </div>
              ))}
              {groups.members.length > 3 && (
                  <div className="w-5 h-5 rounded-full border border-white bg-gray-200 flex items-center justify-center">
                    <span className="text-[8px] font-medium">+{groups.members.length - 3}</span>
                  </div>
              )}
            </div>
            <span className="text-xs text-gray-500">{groups.totalMember}</span>
          </div>
        </div>
      </div>
  )
}