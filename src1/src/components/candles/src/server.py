from flask import *
import startGame

app = Flask(__name__)


@app.route('/')


def play_game():
    # play()
    startGame.play()
    return '<p>Hello there, plz play my sweet game</p>'


def shutdown():
    term = request.environ.get('werkzeug.server.shutdown')
    if term is None:
        raise RuntimeError('Error!')
    term()


if __name__ == '__main__':
    app.run(debug=True)
    app.run()