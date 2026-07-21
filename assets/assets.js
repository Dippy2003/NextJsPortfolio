import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import dipna from './dipna.png';
import dipnaheader from './dipna99.png';
import userdipna from './userdipna.png';
import witedipna from './witedipna.png';
import dash from './dash.png';
import uni from './uni.png';
import mobile from './mobile.jpeg';
import mobile2 from './mobile2.png';
import webdd from './webdd.png';
import ui from './ui.png';

export const assets = {
    witedipna,
    userdipna,
    dipnaheader,
    dipna,
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    firebase,
    figma,
    git,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark,
    dash,
    uni,
    mobile,
    mobile2,
    webdd,
    ui
};

// Category display order — newest/most active areas of work lead the section.
export const workCategoryOrder = [
    'Sports Analytics',
    'AI & Machine Learning',
    'AI Agents & RAG',
    'Data Engineering & BI',
    'Software & Desktop Apps',
    'Mobile Development',
    'UI/UX & Design',
];

export const getWorkData = () => [
    {
        title: 'PlayerPulse',
        description: 'Explainable Football Workload & Fatigue-Risk Analytics',
        link: 'https://github.com/Dippy2003/football-fatigue-analytics',
        technologies: ['Python', 'FastAPI', 'React', 'TypeScript'],
        category: 'Sports Analytics',
        isNew: true,
    },
    {
        title: 'Chest X-Ray Diagnosis',
        description: 'Multi-Label Medical Imaging Classifier',
        link: 'https://github.com/Dippy2003/chest-xray-multilabel-diagnosis2',
        technologies: ['Python', 'Deep Learning', 'Jupyter'],
        category: 'AI & Machine Learning',
        isNew: true,
    },
    {
        title: 'Kidney Disease Classification',
        description: 'ML Disease Classification',
        link: 'https://github.com/Dippy2003/Kidney_Disease_Classification',
        technologies: ['Python', 'Machine Learning', 'Jupyter'],
        category: 'AI & Machine Learning',
        isNew: true,
    },
    {
        title: 'Data-Efficient ViT',
        description: 'Vision Transformer Research',
        link: 'https://github.com/Dippy2003/data-efficient-vit',
        technologies: ['Python', 'PyTorch', 'ViT'],
        category: 'AI & Machine Learning',
    },
    {
        title: 'RAG-N',
        description: 'Retrieval-Augmented Generation System',
        link: 'https://github.com/Dippy2003/RAG-N',
        technologies: ['Python', 'RAG', 'LLM'],
        category: 'AI Agents & RAG',
        isNew: true,
    },
    {
        title: 'Content Crew',
        description: 'Multi-Agent Content Generator',
        link: 'https://github.com/Dippy2003/content-crew',
        technologies: ['Python', 'CrewAI', 'Groq'],
        category: 'AI Agents & RAG',
    },
    {
        title: 'Email Triage Bot',
        description: 'AI Support Ticket Router',
        link: 'https://github.com/Dippy2003/n8n-email-triage-bot',
        technologies: ['n8n', 'OpenAI', 'Automation'],
        category: 'AI Agents & RAG',
    },
    {
        title: 'Hotel Data Warehouse ETL',
        description: 'ETL Pipeline & BI Warehouse',
        link: 'https://github.com/Dippy2003/Hotel-data-warehouse-ETL-bi',
        technologies: ['ETL', 'Data Warehouse', 'SQL'],
        category: 'Data Engineering & BI',
    },
    {
        title: 'Hotel DW SSAS Cube',
        description: 'OLAP Cube for Booking Analytics',
        link: 'https://github.com/Dippy2003/Hotel-DW-SQL-Server-Analysis-Services-Cube',
        technologies: ['SSAS', 'OLAP', 'SQL Server'],
        category: 'Data Engineering & BI',
    },
    {
        title: 'Hotel Booking Dashboard',
        description: 'Power BI Analytics Dashboard',
        link: 'https://github.com/Dippy2003/Hotel-booking-analytics-dashboard-POWER-BI',
        technologies: ['Power BI', 'DAX'],
        category: 'Data Engineering & BI',
    },
    {
        title: 'KaratPOS',
        description: 'Jewelry POS & Inventory System',
        link: 'https://github.com/Dippy2003/KaratPOS',
        technologies: ['Python', 'PySide6', 'SQLite'],
        category: 'Software & Desktop Apps',
        isNew: true,
    },
    {
        title: 'Document Similarity Analyzer',
        description: 'Plagiarism Checker (Custom DSA)',
        link: 'https://github.com/Dippy2003/Document-Similarity-Analyzer',
        technologies: ['C++', 'Data Structures'],
        category: 'Software & Desktop Apps',
    },
    {
        title: 'Smart Campus',
        description: 'Campus Management Web App',
        link: 'https://github.com/Dippy2003/Smart_campus',
        technologies: ['JavaScript'],
        category: 'Software & Desktop Apps',
    },
    {
        title: 'Gold Price Tracker',
        description: 'Real-Time Precious Metals Tracker',
        link: 'https://github.com/Dippy2003/Gold-price-tracker',
        technologies: ['JavaScript', 'CSS'],
        category: 'Software & Desktop Apps',
    },
    {
        title: 'Mern project',
        description: 'MERN project',
        link: 'https://github.com/Dippy2003/MERN-Project2',
        technologies: ['MongoDB', 'Node.js', 'React'],
        category: 'Software & Desktop Apps',
    },
    {
        title: 'Health tracker app',
        description: 'Mobile App',
        link: 'https://github.com/Dippy2003/Mobile-Application',
        technologies: ['Kotlin'],
        category: 'Mobile Development',
    },
    {
        title: 'Mobile app',
        description: 'Mobile App',
        link: 'https://github.com/Dippy2003/MOODORA-Mobile-App',
        technologies: ['Kotlin'],
        category: 'Mobile Development',
    },
    {
        title: 'Jewelry shop website',
        description: 'Web Design',
        link: 'https://www.linkedin.com/posts/dipna-wijesinghe-50401a396_uiux-figma-webdesign-activity-7396429363782619136-Zj1j?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEaNmgABQ5Nh4MXafQNqTF2dCitXtGQdTLw',
        technologies: ['Figma'],
        category: 'UI/UX & Design',
    },
    {
        title: 'UI/UX designing',
        description: 'UI/UX Design',
        link: 'https://www.linkedin.com/posts/dipna-wijesinghe-50401a396_i-designed-unimate-in-figma-as-an-all-in-one-activity-7397117740215451648-MNtx?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEaNmgABQ5Nh4MXafQNqTF2dCitXtGQdTLw',
        technologies: ['Figma'],
        category: 'UI/UX & Design',
    },
]

export const serviceData = [
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', title: 'Web design', description: 'Web development is the process of building, programming...', link: '' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg', title: 'Mobile app', description: 'Mobile app development involves creating software for mobile devices...', link: '' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', title: 'UI/UX design', description: 'UI/UX design focuses on creating a seamless user experience...', link: '' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', title: 'AI/ML & Data Science', description: 'Building and training machine learning models for classification, computer vision, and predictive analytics...', link: '' },
    { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', title: 'AI agents & automation', description: 'Designing RAG pipelines, multi-agent systems, and workflow automations powered by LLMs...', link: '' },
]

export const infoList = [
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Languages', description: 'Python, JavaScript, TypeScript, SQL, Java, PHP, Kotlin, C++, HTML, CSS' },
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: 'Bsc (Hon) in Data Science in SLIIT' },
    { icon: assets.project_icon, iconDark: assets.project_icon_dark, title: 'Projects', description: 'Built 15+ projects across AI/ML, data engineering, and full-stack development' }
];

export const toolsData = [
    assets.vscode, assets.firebase, assets.mongodb, assets.figma, assets.git
];
