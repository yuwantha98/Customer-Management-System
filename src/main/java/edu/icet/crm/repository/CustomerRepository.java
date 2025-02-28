package edu.icet.crm.repository;

import edu.icet.crm.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerRepository extends JpaRepository <CustomerEntity , Integer> {
    List<CustomerEntity> findByName(String name);

    List<CustomerEntity> findByAddress(String address);
}
