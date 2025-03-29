import React from 'react';

const DashboardPlaceholder = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
            {/* Dashboard Background */}
            <rect width="1000" height="600" fill="#FFFFFF" rx="8" ry="8" />
            <rect width="1000" height="60" fill="#F8FAFC" rx="8" ry="8" />

            {/* Header Elements */}
            <rect x="20" y="20" width="160" height="24" fill="#3B82F6" rx="4" ry="4" />
            <rect x="800" y="20" width="80" height="24" fill="#E2E8F0" rx="4" ry="4" />
            <rect x="900" y="20" width="80" height="24" fill="#E2E8F0" rx="4" ry="4" />

            {/* Left Sidebar */}
            <rect x="0" y="60" width="200" height="540" fill="#F8FAFC" />
            <rect x="20" y="90" width="160" height="20" fill="#E2E8F0" rx="4" ry="4" />
            <rect x="20" y="130" width="160" height="20" fill="#E2E8F0" rx="4" ry="4" />
            <rect x="20" y="170" width="160" height="20" fill="#E2E8F0" rx="4" ry="4" />
            <rect x="20" y="210" width="160" height="20" fill="#3B82F6" rx="4" ry="4" />
            <rect x="20" y="250" width="160" height="20" fill="#E2E8F0" rx="4" ry="4" />

            {/* Main Content - Top Summary Cards */}
            <rect x="220" y="80" width="180" height="100" fill="#FFFFFF" rx="8" ry="8" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="240" y="100" width="100" height="20" fill="#E2E8F0" rx="4" ry="4" />
            <text x="240" y="145" fontFamily="Arial" fontSize="24" fill="#3B82F6" fontWeight="bold">24,582</text>

            <rect x="420" y="80" width="180" height="100" fill="#FFFFFF" rx="8" ry="8" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="440" y="100" width="100" height="20" fill="#E2E8F0" rx="4" ry="4" />
            <text x="440" y="145" fontFamily="Arial" fontSize="24" fill="#3B82F6" fontWeight="bold">62%</text>

            <rect x="620" y="80" width="180" height="100" fill="#FFFFFF" rx="8" ry="8" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="640" y="100" width="100" height="20" fill="#E2E8F0" rx="4" ry="4" />
            <text x="640" y="145" fontFamily="Arial" fontSize="24" fill="#3B82F6" fontWeight="bold">3:42</text>

            <rect x="820" y="80" width="160" height="100" fill="#FFFFFF" rx="8" ry="8" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="840" y="100" width="100" height="20" fill="#E2E8F0" rx="4" ry="4" />
            <text x="840" y="145" fontFamily="Arial" fontSize="24" fill="#3B82F6" fontWeight="bold">5.3</text>

            {/* Traffic Overview Chart */}
            <rect x="220" y="200" width="760" height="250" fill="#FFFFFF" rx="8" ry="8" stroke="#E2E8F0" strokeWidth="2" />
            <rect x="240" y="220" width="160" height="24" fill="#E2E8F0" rx="4" ry="4" />

            {/* Chart Element */}
            <polyline points="240,400 340,350 440,370 540,310 640,290 740,330 840,280 940,300"
                fill="none" stroke="#3B82F6" strokeWidth="3" />
            <polyline points="240,420 340,390 440,410 540,380 640,400 740,370 840,390 940,360"
                fill="none" stroke="#93C5FD" strokeWidth="3" />

            {/* X-Axis Labels */}
            <rect x="240" y="430" width="40" height="16" fill="#E2E8F0" rx="2" ry="2" />
            <rect x="340" y="430" width="40" height="16" fill="#E2E8F0" rx="2" ry="2" />
            <rect x="440" y="430" width="40" height="16" fill="#E2E8F0" rx="2" ry="2" />
            <rect x="540" y="430" width="40" height="16" fill="#E2E8F0" rx="2" ry="2" />
            <rect x="640" y="430" width="40" height="16" fill="#E2E8F0" rx="2" ry="2" />
            <rect x="740" y="430" width="40" height="16" fill="#E2E8F0" rx="2" ry="2" />
            <rect x="840" y="430" width="40" height="16" fill="#E2E8F0" rx="2" ry="2" />
            <rect x="940" y="430" width="40" height="16" fill="#E2E8F0" rx="2" ry="2" />

            {/* AI Recommendations Box */}
            <rect x="220" y="470" width="760" height="110" fill="#F0F7FF" rx="8" ry="8" stroke="#BFDBFE" strokeWidth="2" />
            <rect x="250" y="490" width="240" height="24" fill="#BFDBFE" rx="4" ry="4" />
            <rect x="250" y="530" width="500" height="16" fill="#BFDBFE" rx="4" ry="4" opacity="0.7" />
            <rect x="250" y="550" width="400" height="16" fill="#BFDBFE" rx="4" ry="4" opacity="0.7" />

            {/* AI Icon */}
            <circle cx="700" cy="525" r="25" fill="#3B82F6" />
            <rect x="690" y="515" width="20" height="20" fill="#FFFFFF" rx="2" ry="2" />
        </svg>
    );
};

export default DashboardPlaceholder;