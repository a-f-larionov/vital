FROM openjdk:21
ADD ./target/lm-0.0.1-SNAPSHOT.jar .
ENTRYPOINT ["java", "-Xmx40m", "-Xms10m", "-Xss200k", "-jar" , "lm-0.0.1-SNAPSHOT.jar"]