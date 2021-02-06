import path from "path"

function getStaticPath(path: { join: Function }) {
	return function (directory: string) {
		return path.join(__dirname, "../../", directory)
	}
}

export default getStaticPath(path)