#
# example Dockerfile for https://docs.docker.com/examples/postgresql_service/
#

FROM ubuntu:14.04
MAINTAINER SvenDowideit@docker.com

#ENV http_proxy 'http://16.42.57.12:8080'
#ENV https_proxy 'http://16.42.57.12:8080'
#ENV HTTP_PROXY 'http://16.42.57.12:8080'
#ENV HTTPS_PROXY 'http://16.42.57.12:8080'

#RUN echo 'Acquire::http::Proxy "http://16.42.57.12:8080/";' > /etc/apt/apt.conf.d/proxy

# Add the PostgreSQL PGP key to verify their Debian packages.
# It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

# Add PostgreSQL's repository. It contains the most recent stable release
#     of PostgreSQL, ``9.3``.
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list

# Install ``python-software-properties``, ``software-properties-common`` and PostgreSQL 9.3
#  There are some warnings (in red) that show up during the build. You can hide
#  them by prefixing each apt-get statement with DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y python-software-properties software-properties-common postgresql-9.3 postgresql-client-9.3 postgresql-contrib-9.3

# Note: The official Debian and Ubuntu images automatically ``apt-get clean``
# after each ``apt-get``

# Run the rest of the commands as the ``postgres`` user created by the ``postgres-9.3`` package when it was ``apt-get installed``
USER postgres

# default root password
#RUN echo "postgres:postgres" | chpasswd

# Create a PostgreSQL role named ``docker`` with ``docker`` as the password and
# then create a database `docker` owned by the ``docker`` role.
# Note: here we use ``&&\`` to run commands one after the other - the ``\``
#       allows the RUN command to span multiple lines.
RUN    /etc/init.d/postgresql start &&\

    # set default db to be UTF8
    psql --command "CREATE USER udo WITH SUPERUSER PASSWORD 'udo1234';" &&\

    psql --command "UPDATE pg_database SET datistemplate=FALSE WHERE datname='template1';" &&\

    psql --command "DROP DATABASE template1;" &&\

    psql --command "CREATE DATABASE template1 WITH owner=postgres template=template0 encoding='UTF8';" &&\

    psql --command "UPDATE pg_database SET datistemplate=TRUE WHERE datname='template1';" &&\

    # create udo_db with owner udo
    createdb -O udo udo_db

# Adjust PostgreSQL configuration so that remote connections to the
# database are possible.
RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.3/main/pg_hba.conf

# And add ``listen_addresses`` to ``/etc/postgresql/9.3/main/postgresql.conf``
RUN echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf

# Expose the PostgreSQL port
EXPOSE 5432

# Copy create db file
ADD ./create_db /var/lib/postgresql/create_db
ADD ./sample_data /var/lib/postgresql/sample_data

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

# Set the default command to run when starting the container
CMD ["/usr/lib/postgresql/9.3/bin/postgres", "-D", "/var/lib/postgresql/9.3/main", "-c", "config_file=/etc/postgresql/9.3/main/postgresql.conf"]
