/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fakestoreapi.com', "encrypted-tbn0.gstatic.com", "wakatime.com", "*.com", "*.ru", "*.net", "*.kz"],
  },
  transpilePackages: [ 'antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-notification', 'rc-tooltip' ],
};

export default nextConfig;
