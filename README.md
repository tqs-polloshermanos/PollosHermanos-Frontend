# PollosHermanos - Frontend

The Frontend is divided into 3 interfaces:
- Client's interface: https://github.com/tqs-polloshermanos/PollosHermanos-Frontend/tree/main/Frontend/polloshermanos
- Employee's interface: https://github.com/tqs-polloshermanos/PollosHermanos-Frontend/tree/main/Frontend/employees
- Live Call Screen's interface: https://github.com/tqs-polloshermanos/PollosHermanos-Frontend/tree/main/Frontend/screen  

Usefull commands to run Docker:
- backend -> docker run -d -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=taskdb --name mysqldb -p 3307:3306 mysql:8.0
- frontend (client) -> docker run -d -p 8080:80 polloshermanos
- frontend (employee) -> docker run -d -p 8081:80 --name frontend-employees frontend-employees
- frontend (screen) -> docker run -d -p 8082:80 --name frontend-screen my-react-app
