"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChatAnimation } from "@/components/ui/chat-animation"
import {EnhancedIsometricServer} from "@/components/ui/enhancedIsometricserver"
import {
    MessageCircle,
    Shield,
    Zap,
    Globe,
    ChevronRight,
    Check,
    Users,
    Headphones,
    Code,
    ArrowRight, Facebook,
} from "lucide-react"

import BinaryDataStreamAnimation from "@/components/ui/binary-server-animation";
import { SiZalo } from "react-icons/si";
import {FaEnvelope, FaTelegram} from "react-icons/fa";
import {Navbar} from "@/components/navbar";
export default function Home() {
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (

        <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
            {/* Hero Section */}
            <Navbar />

            <header className="w-full py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <motion.div className="absolute inset-0 z-0" style={{ y }}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-10 filter blur-3xl"></div>
                </motion.div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-900 mb-6">
                            Kết nối tức thì với{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Zework</span>
                        </h1>
                        <p className="mt-3 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Trải nghiệm tương lai của giao tiếp. Bảo mật, nhanh chóng và đầy đủ tính năng cho mọi người.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Button
                            asChild
                            size="lg"
                            className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <Link href="/signup">
                                Bắt đầu ngay <ChevronRight className="ml-2" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="text-lg px-8 py-6 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
                        >
                            <Link href="/demo">Dùng thử</Link>
                        </Button>
                    </motion.div>
                    <motion.div
                        className="relative z-10 max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >

                        <ChatAnimation  userInfo={{
                            name: "Anh Nguyen",
                            avatar: "./images/logo.svg",
                            tags: ["Khách Vip", "Mua Nhiều"]
                        }}/>
                        <div className="flex flex-col items-center">
                            <BinaryDataStreamAnimation  />
                        </div>
                        <div className="flex flex-col items-center">
                            <EnhancedIsometricServer/>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Giới thiệu Section */}
            <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
                       <span className="text-blue-800">Zework</span> - Cách Mới Để Kết Nối
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        Zework không chỉ là một ứng dụng nhắn tin thông thường. Chúng tôi mang đến một trải nghiệm giao tiếp hoàn
                        toàn mới, kết hợp giữa công nghệ tiên tiến và thiết kế thân thiện với người dùng.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md"
                            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                        >
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tầm nhìn của chúng tôi</h3>
                            <p className="text-gray-600">
                                Chúng tôi hướng tới việc tạo ra một nền tảng giao tiếp toàn cầu, nơi mọi người có thể kết nối một cách
                                tự do, an toàn và sáng tạo. Zework không chỉ là một công cụ, mà còn là một cộng đồng nơi mọi ý tưởng
                                được chia sẻ và phát triển.
                            </p>
                        </motion.div>
                        <motion.div
                            className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-md"
                            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                        >
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sứ mệnh của chúng tôi</h3>
                            <p className="text-gray-600">
                                Sứ mệnh của Zework là đơn giản hóa và nâng cao chất lượng giao tiếp trong thời đại số. Chúng tôi cam kết
                                cung cấp một nền tảng an toàn, dễ sử dụng và liên tục cải tiến để đáp ứng nhu cầu ngày càng tăng của
                                người dùng trong việc kết nối và chia sẻ.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
                        Tính Năng Mạnh Mẽ cho Giao Tiếp Liền Mạch
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <FeatureCard
                            icon={<MessageCircle className="h-10 w-10 text-blue-500" />}
                            title="Nhắn tin thời gian thực"
                            description="Trải nghiệm giao tiếp nhanh như chớp với tính năng gửi tin nhắn tức thì và xác nhận đã đọc."
                            details={[
                                "Chỉ báo đang nhập tin nhắn",
                                "Phản ứng với tin nhắn",
                                "Trả lời theo chuỗi",
                                "Định dạng văn bản phong phú",
                            ]}
                        />
                        <FeatureCard
                            icon={<Shield className="h-10 w-10 text-blue-500" />}
                            title="Mã hóa đầu cuối"
                            description="Bảo mật là ưu tiên hàng đầu của chúng tôi. Tất cả tin nhắn đều được mã hóa để đảm bảo cuộc trò chuyện của bạn luôn riêng tư."
                            details={["Mã hóa AES 256-bit", "Bảo mật chuyển tiếp hoàn hảo", "Tin nhắn tự hủy", "Xác thực hai yếu tố"]}
                        />
                        <FeatureCard
                            icon={<Zap className="h-10 w-10 text-blue-500" />}
                            title="Chia sẻ đa phương tiện"
                            description="Chia sẻ nhiều hơn chỉ là văn bản. Thể hiện bản thân với nhiều tùy chọn đa phương tiện."
                            details={["Chia sẻ ảnh và video", "Chuyển file lên đến 2GB", "Tin nhắn thoại", "Hỗ trợ GIF và sticker"]}
                        />
                        <FeatureCard
                            icon={<Globe className="h-10 w-10 text-blue-500" />}
                            title="Đồng bộ đa nền tảng"
                            description="Luôn kết nối trên mọi thiết bị của bạn với tính năng đồng bộ hóa liền mạch."
                            details={[
                                "Ứng dụng web, desktop và di động",
                                "Đồng bộ thời gian thực giữa các thiết bị",
                                "Hỗ trợ chế độ ngoại tuyến",
                                "Sao lưu và khôi phục đám mây",
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Tính năng nâng cao Section */}
            <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">Tính Năng Nâng Cao</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <AdvancedFeatureCard
                            icon={<Users className="h-12 w-12 text-indigo-500" />}
                            title="Nhóm chat và kênh"
                            description="Tạo và quản lý nhóm chat cho các dự án, sở thích hoặc sự kiện. Tổ chức thông tin với các kênh chủ đề."
                        />
                        <AdvancedFeatureCard
                            icon={<Code className="h-12 w-12 text-indigo-500" />}
                            title="Tích hợp và Bot"
                            description="Kết nối Zework với các ứng dụng yêu thích của bạn. Tạo bot để tự động hóa tác vụ và tăng năng suất."
                        />
                        <AdvancedFeatureCard
                            icon={<Headphones className="h-12 w-12 text-indigo-500" />}
                            title="Cuộc gọi âm thanh và video"
                            description="Thực hiện cuộc gọi âm thanh và video chất lượng cao với bảo mật đầu cuối."
                        />
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">Chọn Gói Phù Hợp Với Bạn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PricingCard
                            title="Cơ bản"
                            price="Miễn phí"
                            description="Hoàn hảo cho người dùng cá nhân"
                            features={["Tin nhắn không giới hạn", "Mã hóa cơ bản", "1GB lưu trữ file", "2 thiết bị mỗi tài khoản"]}
                            ctaText="Bắt đầu ngay"
                            ctaLink="/login" period={undefined}                        />
                        <PricingCard
                            title="Pro"
                            price="2$"
                            period="/tháng/người"
                            description="Lý tưởng cho người dùng chuyên nghiệp và nhóm nhỏ"
                            features={[
                                "Tất cả tính năng Cơ bản",
                                "Mã hóa nâng cao",
                                "10GB lưu trữ file",
                                "Thiết bị không giới hạn",
                                "Hỗ trợ ưu tiên",
                            ]}
                            ctaText="Dùng thử Pro"
                            ctaLink="/signup-pro"
                            highlighted={true}
                        />
                        <PricingCard
                            title="Doanh nghiệp"
                            price="Tùy chỉnh"
                            description="Cho tổ chức lớn với nhu cầu cụ thể"
                            features={[
                                "Tất cả tính năng Pro",
                                "Tích hợp tùy chỉnh",
                                "Lưu trữ file không giới hạn",
                                "Kiểm soát quản trị nâng cao",
                                "Hỗ trợ 24/7 chuyên biệt",
                            ]}
                            ctaText="Liên hệ bộ phận bán hàng"
                            ctaLink="/contact-sales" period={undefined}                        />
                    </div>
                </div>
            </section>

            {/* Ưu điểm của Zework Section */}
            <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">Tại Sao Chọn <span className="text-blue-800">Zework</span>?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AdvantageCard
                            icon={<Shield className="h-12 w-12 text-green-500" />}
                            title="Bảo mật tuyệt đối"
                            description="Với mã hóa đầu cuối và các tính năng bảo mật tiên tiến, dữ liệu của bạn luôn được bảo vệ an toàn."
                        />
                        <AdvantageCard
                            icon={<Zap className="h-12 w-12 text-yellow-500" />}
                            title="Hiệu suất cao"
                            description="Trải nghiệm giao tiếp mượt mà và nhanh chóng, ngay cả khi xử lý lượng lớn dữ liệu."
                        />
                        <AdvantageCard
                            icon={<Users className="h-12 w-12 text-blue-500" />}
                            title="Cộng đồng sôi động"
                            description="Tham gia vào một cộng đồng người dùng năng động, luôn sẵn sàng chia sẻ và hỗ trợ lẫn nhau."
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">Người Dùng Nói Gì Về <span className="text-blue-800">Zework</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <TestimonialCard
                            quote="Zework đã cách mạng hóa cách nhóm chúng tôi giao tiếp. Nó nhanh, an toàn và đầy đủ tính năng!"
                            author="Nguyễn Thị Lan"
                            role="Quản lý dự án"
                        />
                        <TestimonialCard
                            quote="Tôi yêu thích cách tôi có thể truy cập các cuộc trò chuyện từ bất kỳ thiết bị nào. Giao diện rất đẹp và trực quan."
                            author="Trần Văn Minh"
                            role="Nhà thiết kế đồ họa"
                        />
                        <TestimonialCard
                            quote="Tính năng mã hóa đầu cuối giúp tôi yên tâm khi thảo luận về các chủ đề nhạy cảm."
                            author="Lê Hoàng Anh"
                            role="Cố vấn tài chính"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-600 to-indigo-600 text-white overflow-hidden">
                <div className="max-w-3xl mx-auto text-center relative">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Sẵn sàng để Cách Mạng Hóa Giao Tiếp của Bạn?</h2>
                    <p className="text-xl mb-8">Tham gia cùng hàng triệu người dùng đã chuyển sang sử dụng Zework.</p>
                    <div className="relative inline-block">
                        <motion.div
                            className="absolute inset-0 bg-white rounded-full opacity-20"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.3, 0.2],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                        <Button
                            asChild
                            size="lg"
                            className="text-lg px-8 py-6 rounded-full bg-white text-teal-600 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl relative z-10"
                        >
                            <Link href="/signup">
                                Bắt Đầu Ngay Hôm Nay <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                        {[...Array(3)].map((_, index) => (
                            <motion.div
                                key={index}
                                className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0, 1, 0],
                                    x: [0, (index - 1) * 100],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: index * 0.5,
                                    ease: "easeInOut",
                                }}
                            >
                                <ArrowRight className="w-full h-full text-white filter drop-shadow-lg" />
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    />
                </div>
            </section>

            <footer className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white mb-4">Zework</h3>
                            <p className="text-gray-400">Kết nối tức thì, an toàn và sáng tạo cho mọi người.</p>
                            <div className="flex space-x-4">
                                <SocialIcon icon={<MessageCircle className="h-5 w-5" />} href="#" />
                                <SocialIcon icon={<Facebook className="h-5 w-5" />} href="#" />
                                <SocialIcon icon={<SiZalo className="h-5 w-5" />} href="#" />
                                <SocialIcon icon={<FaTelegram className="h-5 w-5" />} href="#" />
                                <SocialIcon icon={<FaEnvelope className="h-5 w-5" />} href="mailto:x@vn.news" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Về Zework</h4>
                            <FooterLinkList>
                                <FooterLink href="/about">Giới thiệu</FooterLink>
                                <FooterLink href="/careers">Tuyển dụng</FooterLink>
                                <FooterLink href="/press">Báo chí</FooterLink>
                                <FooterLink href="/blog">Blog</FooterLink>
                            </FooterLinkList>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Hỗ trợ</h4>
                            <FooterLinkList>
                                <FooterLink href="/help">Trung tâm trợ giúp</FooterLink>
                                <FooterLink href="/community">Cộng đồng</FooterLink>
                                <FooterLink href="/contact">Liên hệ</FooterLink>
                                <FooterLink href="/status">Trạng thái hệ thống</FooterLink>
                            </FooterLinkList>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Pháp lý</h4>
                            <FooterLinkList>
                                <FooterLink href="/privacy">Chính sách bảo mật</FooterLink>
                                <FooterLink href="/terms">Điều khoản sử dụng</FooterLink>
                                <FooterLink href="/cookies">Chính sách cookie</FooterLink>
                                <FooterLink href="/gdpr">GDPR</FooterLink>
                            </FooterLinkList>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-sm text-gray-400 mb-4 md:mb-0">© 2023 Zework. Tất cả các quyền được bảo lưu.</p>
                            <div className="flex space-x-4">
                                <Link href="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                                    Sơ đồ trang
                                </Link>
                                <Link
                                    href="/accessibility"
                                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                                >
                                    Khả năng tiếp cận
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

// @ts-ignore
function FeatureCard({ icon, title, description, details }) {
    return (
        <motion.div
            className="flex flex-col p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ y: -5 }}
        >
            <div className="flex items-center mb-4">
                {icon}
                <h3 className="ml-4 text-xl font-semibold text-gray-800">{title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{description}</p>
            <ul className="mt-auto">
                {details.map((detail: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                    <li key={index} className="flex items-center text-gray-600 mb-2">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        {detail}
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}

// @ts-ignore
function AdvancedFeatureCard({ icon, title, description }) {
    return (
        <motion.div
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            whileHover={{ y: -5 }}
        >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    )
}

// @ts-ignore
function PricingCard({ title, price, period, description, features, ctaText, ctaLink, highlighted = false }) {
    return (
        <motion.div
            className={`flex flex-col p-6 rounded-lg shadow-lg transition-shadow duration-300 ${
                highlighted ? "bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-blue-500" : "bg-white"
            }`}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
            <h3 className={`text-2xl font-bold mb-2 ${highlighted ? "text-blue-600" : "text-gray-800"}`}>{title}</h3>
            <div className="flex items-baseline mb-4">
                <span className="text-4xl font-extrabold">{price}</span>
                {period && <span className="ml-1 text-gray-500">{period}</span>}
            </div>
            <p className="text-gray-600 mb-6">{description}</p>
            <ul className="mb-6 flex-grow">
                {features.map((feature: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                    <li key={index} className="flex items-center text-gray-600 mb-2">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                    </li>
                ))}
            </ul>
            <Button asChild className={`mt-auto ${highlighted ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
                <Link href={ctaLink}>{ctaText}</Link>
            </Button>
        </motion.div>
    )
}

// @ts-ignore
function AdvantageCard({ icon, title, description }) {
    return (
        <motion.div
            className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    )
}

// @ts-ignore
function TestimonialCard({ quote, author, role }) {
    return (
        <motion.div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
            <blockquote className="text-gray-600 italic mb-4">{quote}</blockquote>
            <p className="font-semibold text-gray-800">{author}</p>
            <p className="text-gray-500">{role}</p>
        </motion.div>
    )
}

// @ts-ignore
function SocialIcon({ icon, href }) {
    return (
        <motion.a
            href={href}
            className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {icon}
        </motion.a>
    )
}

// @ts-ignore
function FooterLinkList({ children }) {
    return <ul className="space-y-2">{children}</ul>
}

// @ts-ignore
function FooterLink({ href, children }) {
    return (
        <li>
            <motion.a
                href={href}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
            >
                {children}
            </motion.a>
        </li>
    )
}

