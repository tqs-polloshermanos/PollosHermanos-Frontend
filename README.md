# PollosHermanos - TQS Project 2023/2024

Report:
https://uapt33090-my.sharepoint.com/:w:/g/personal/mariasardinha_ua_pt/EQz6UaIOgqVGtyJmr9jngbEBECnE32HsVJAmttodXCL3_g?e=Umbz6O

Jira:
https://mateusz-kubiak.atlassian.net/jira/software/projects/NA/boards/2?atlOrigin=eyJpIjoiZTIzOWE5MTZjMjQ3NDg3M2E2NjJmODM5MTU3MDdmYzIiLCJwIjoiaiJ9

Prototype - Figma:
https://www.figma.com/file/f0iRnEPgXhjRjCzCGBp8BM/Untitled?type=design&node-id=0%3A1&mode=design&t=gR20IXJPBC2gRh1e-1

Drive:
https://drive.google.com/drive/folders/17yzMTDpnrf3mIZ_kcYQiz4SihD0tW_Vi?usp=sharing


Docker:
- backend -> docker run -d -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=taskdb --name mysqldb -p 3307:3306 mysql:8.0
- frontend (client) -> docker run -d -p 8080:80 polloshermanos
- frontend (employee) -> docker run -d -p 8081:80 --name frontend-employees frontend-employees
- frontend (screen) -> docker run -d -p 8082:80 --name frontend-screen my-react-app