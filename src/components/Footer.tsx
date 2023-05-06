import React from "react"
import styles from "@styles/components/footer.module.scss"


const Footer = () => {
  return (
    <footer id="site-footer" className={ `text-center ${ styles.footer }` }>
      <p>Copyright &copy; by Hieu TN &nbsp; &nbsp; 2016 - present</p>
    </footer>
  )
}

export default Footer
