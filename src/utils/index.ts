import path from "path"
import moment from 'moment';

function getStaticPath(path: { resolve: Function }) {
	return function (directory: string) {
		return path.resolve(__dirname, "../../", directory)
	}
}

export function formatMessage(username: string, text: string) {
	return {
		username,
		text,
		timestamp: moment().format("h:mm a")
	}
}

export default getStaticPath(path)