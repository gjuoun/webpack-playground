import "./style.css"
import "./style2.css"
import 'bootstrap/dist/css/bootstrap.min.css';

// const str = css.toString()

console.log("my ts");

const fn = ({ happy }: { happy: string }) => {
  return 1 + happy
}

export default fn