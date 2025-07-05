import React from 'react'

function ExpertiseCard({ stats, description }) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
            <div className={`text-3xl font-bold text-text mb-2`}>{stats}</div>
            <div className="text-gray-600">{description}</div>
        </div>
    )
}

export default ExpertiseCard
