"use client"

// import Image from 'next/image'
// import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import BabylonScene from './lib/BabylonScene'

export default function Home() {
  return (
    <div className="container-fluid p-2 text-center">
      <BabylonScene />
    </div>
  )
}
