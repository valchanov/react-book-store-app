ARG BUILD_HOME=/book-service

# Build stage
FROM gradle:7.4.0-jdk17-alpine as build-image
ARG BUILD_HOME
ENV APP_HOME=$BUILD_HOME
WORKDIR $APP_HOME
COPY --chown=gradle:gradle build.gradle settings.gradle $APP_HOME/
COPY --chown=gradle:gradle src $APP_HOME/src
RUN gradle build --no-daemon

# Package stage
FROM openjdk:17-alpine
ARG BUILD_HOME
ENV APP_HOME=$BUILD_HOME
COPY --from=build-image $APP_HOME/build/libs/book-service-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT java -jar app.jar
