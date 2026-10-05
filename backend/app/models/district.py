from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database import Base


class District(Base):
    __tablename__ = "districts"

    district_id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    district_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    areas = relationship(
        "Area",
        back_populates="district",
    )