import socket


def handle_request(client_socket):
    request_data = b""

    # Чтение данных из сокета
    while True:
        chunk = client_socket.recv(1024)
        if not chunk:
            break
        request_data += chunk
        if b'\r\n\r\n' in request_data:
            break

    # Печатаем полученный HTTP-запрос
    print(request_data.decode("utf-8"))

    # Отправляем HTTP-ответ
    response = "HTTP/1.1 200 OK\r\n"
    response += "Content-Type: text/html; charset=utf-8\r\n"
    response += "\r\n"
    response += "<p>Hello there!</p>"

    client_socket.sendall(response.encode("utf-8"))


def main():
    host = '127.0.0.1'
    port = 8000

    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server_socket.bind((host, port))
    server_socket.listen(5)

    print(f"Server started on http://{host}:{port}")

    try:
        while True:
            client_socket, addr = server_socket.accept()
            print(f"Client connected: {addr}")

            # Обрабатываем запрос в новом потоке
            handle_request(client_socket)

            # Закрываем соединение с клиентом
            client_socket.close()
            print("Client disconnected")
    except KeyboardInterrupt:
        print("Server stopped.")


if __name__ == "__main__":
    main()
