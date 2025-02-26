package edu.icet.crm.repository;

import edu.icet.crm.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository <CustomerEntity , Integer> {
}
