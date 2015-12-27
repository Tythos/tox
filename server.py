import cherrypy
import os

hostIp = "127.0.0.1"
portNumber = 1337

class ImpulseServer(object):
	def get_path(self, data_path):
		return os.path.dirname(os.path.realpath(__file__)) + os.sep + data_path

	@cherrypy.expose
	def index(self):
		main_path = self.get_path('main.html')
		with open(main_path, "r") as f:
			return f.read()
		
conf = {
	'global': {
		'server.socket_host': hostIp,
		'server.socket_port': portNumber,
	},
	'/': {
		'tools.sessions.on': True,
		'tools.staticdir.root': os.path.abspath(os.getcwd()),
		'tools.staticdir.on': True,
		'tools.staticdir.dir': ".",
	}
}

if __name__ == '__main__':
	cherrypy.quickstart(ImpulseServer(), '/', conf)

