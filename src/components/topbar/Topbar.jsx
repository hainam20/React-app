import React from 'react'
import "./topbar.css"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Topbar() {
  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
              <span className="logo">ADMIN</span>
            </div>
            <div className="topRight">
              <div className="topbarIcons">
                  <NotificationsNoneIcon/>
              </div>
              <div className="topbarIcons">
                  <LanguageIcon/>
              </div>
              <div className="topbarIcons">
                  <SettingsIcon/>
              </div>
            </div>
        </div>
    </div>
  )
}
