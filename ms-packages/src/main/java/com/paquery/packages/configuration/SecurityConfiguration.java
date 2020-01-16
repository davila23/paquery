package com.paquery.packages.configuration;

import com.paquery.security.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Value("${admin.username}")
    private String usernameAdmin;

    @Value("${admin.password}")
    private String passwordAdmin;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .logout().permitAll()
            .and()
                .httpBasic()
            .and()
            .authorizeRequests()
                .antMatchers("/health/**").permitAll()
                .antMatchers("/packages/**").permitAll()
                .antMatchers("/report/**").permitAll()
                .antMatchers("/admin/**").hasAuthority(UserRole.ROLE_ADMINISTRATOR)
                .antMatchers("/sign/**").permitAll()
                .antMatchers("/paquer/**").permitAll()
                .antMatchers("/actuator/**").hasAuthority(UserRole.ROLE_ADMINISTRATOR)
                .anyRequest().denyAll()
            ;
    }

    @Autowired
    void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        auth.inMemoryAuthentication()
                .withUser(usernameAdmin)
                .password("{noop}"+passwordAdmin)
            .authorities(UserRole.ROLE_ADMINISTRATOR);
    }
}
