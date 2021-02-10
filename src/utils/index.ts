import path from "path"

function getStaticPath(path: { resolve: Function }) {
	return function (directory: string) {
		return path.resolve(__dirname, "../../", directory)
	}
}

export default getStaticPath(path)