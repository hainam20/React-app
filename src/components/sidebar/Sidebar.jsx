import "./sidebar.css"
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import React from 'react'

export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <HomeIcon className="sidebarIcon"/>
                        Home
                    </li>
                    <li className="sidebarListItem">
                        <LeaderboardIcon className="sidebarIcon"/>
                        Chart
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
