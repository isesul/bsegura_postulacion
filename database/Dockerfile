FROM mcr.microsoft.com/mssql/server

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=BSegura123#
ENV MSSQL_PID=Developer
ENV MSSQL_TCP_PORT=1433

WORKDIR /src

COPY create_models.sql ./create_models.sql

RUN (/opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" &&  /opt/mssql-tools/bin/sqlcmd -S127.0.0.1 -Usa -PBSegura123# -i create_models.sql
