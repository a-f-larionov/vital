FROM openjdk:21
ADD ./target/vp-0.0.1-SNAPSHOT.jar .
ENTRYPOINT ["java", "-Xmx40m", "-Xms10m", "-Xss200k", "-jar" , "vp-0.0.1-SNAPSHOT.jar"]